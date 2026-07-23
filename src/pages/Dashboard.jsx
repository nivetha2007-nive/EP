import { useAuth } from '../context/AuthContext';
import { useUserTrolley } from '../hooks/useUserTrolley';
import { ref, update, set, get } from 'firebase/database';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import BillPanel from '../components/BillPanel';
import RunningTotal from '../components/RunningTotal';
import BudgetBar from '../components/BudgetBar';
import BudgetSetter from '../components/BudgetSetter';
import AlertBanner from '../components/AlertBanner';
import DeviceStatus from '../components/DeviceStatus';
import DevTools from '../components/DevTools';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { items, runningTotal, budgetLimit, budgetExceeded, lastUpdated, trolleyId, status, loading } = useUserTrolley();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [localBudget, setLocalBudget] = useState(null);
  const [localItems, setLocalItems] = useState([]);
  const [localTotal, setLocalTotal] = useState(0);
  const previousBudgetExceeded = useRef(false);

  // Use local data if available, otherwise use Firebase data
  const currentBudget = localBudget !== null ? localBudget : budgetLimit;
  const currentItems = localItems.length > 0 ? localItems : items;
  const currentTotal = localItems.length > 0 ? localTotal : runningTotal;
  const currentBudgetExceeded = currentTotal > currentBudget;

  // Watch for budget exceeded and show popup
  useEffect(() => {
    // Only show popup if budget just exceeded (not on initial load)
    if (currentBudgetExceeded && !previousBudgetExceeded.current && currentTotal > 0) {
      // Show popup alert
      const overAmount = currentTotal - currentBudget;
      window.alert(
        `⚠️ BUDGET EXCEEDED!\n\n` +
        `Budget Limit: ₹${currentBudget.toFixed(2)}\n` +
        `Current Total: ₹${currentTotal.toFixed(2)}\n` +
        `Over Budget: ₹${overAmount.toFixed(2)}\n\n` +
        `Please remove items or increase your budget.`
      );
      
      // Also show toast notification
      toast.error(`Budget exceeded by ₹${overAmount.toFixed(2)}!`, {
        autoClose: 5000,
      });
    }
    
    // Update ref for next comparison
    previousBudgetExceeded.current = currentBudgetExceeded;
  }, [currentBudgetExceeded, currentTotal, currentBudget]);

  const handleBudgetUpdate = (newBudget) => {
    // Update local budget state
    setLocalBudget(newBudget);
  };

  const handleLocalUpdate = (action) => {
    if (action.type === 'ADD_ITEM') {
      // Add item to local state
      const newItems = [action.item, ...currentItems];
      const newTotal = currentTotal + action.item.price;
      
      setLocalItems(newItems);
      setLocalTotal(newTotal);
    } else if (action.type === 'RESET') {
      // Reset local state
      setLocalItems([]);
      setLocalTotal(0);
    }
  };

  const handleCheckout = async () => {
    if (currentItems.length === 0) {
      toast.error('No items to checkout');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to checkout? Total: ₹${currentTotal.toFixed(2)}`
    );

    if (!confirmed) return;

    setIsCheckingOut(true);

    try {
      // Create session history entry
      const sessionId = `session_${Date.now()}`;
      const sessionRef = ref(database, `/sessionHistory/${trolleyId}/${sessionId}`);
      
      await set(sessionRef, {
        items: currentItems,
        finalTotal: currentTotal,
        budgetLimit: currentBudget,
        budgetExceeded: currentBudgetExceeded,
        checkedOutAt: Date.now()
      });

      // Clear trolley
      const trolleyRef = ref(database, `/trolleys/${trolleyId}`);
      await update(trolleyRef, {
        items: [],
        runningTotal: 0,
        budgetExceeded: false,
        status: 'checked_out',
        lastUpdated: Date.now()
      });

      // Reset to active after a moment
      setTimeout(async () => {
        await update(trolleyRef, {
          status: 'active'
        });
      }, 1000);

      // Clear local state
      setLocalItems([]);
      setLocalTotal(0);

      toast.success('Checkout successful! 🎉');
    } catch (error) {
      console.error('Checkout error:', error);
      
      // If Firebase fails, just clear local state
      setLocalItems([]);
      setLocalTotal(0);
      toast.success('Checkout successful! (local only)');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your trolley...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Shopping Dashboard</h1>
          <p className="dashboard-subtitle">Track your budget in real-time</p>
        </div>
        <DeviceStatus lastUpdated={lastUpdated} />
      </div>

      <AlertBanner budgetExceeded={currentBudgetExceeded} />

      <div className="dashboard-grid">
        <div className="grid-left">
          <RunningTotal total={currentTotal} />
          <BudgetBar runningTotal={currentTotal} budgetLimit={currentBudget} />
          <BudgetSetter 
            currentBudget={currentBudget} 
            trolleyId={trolleyId} 
            onBudgetUpdate={handleBudgetUpdate}
          />
          
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isCheckingOut || currentItems.length === 0}
          >
            {isCheckingOut ? 'Processing...' : '🛒 Checkout'}
          </button>
        </div>

        <div className="grid-right">
          <BillPanel items={currentItems} />
        </div>
      </div>

      <DevTools trolleyId={trolleyId} onLocalUpdate={handleLocalUpdate} />
    </div>
  );
};

export default Dashboard;
