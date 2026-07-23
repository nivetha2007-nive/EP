import { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import './DevTools.css';

// Sample products for simulation
const SAMPLE_PRODUCTS = [
  { name: 'Milk 1L', price: 55 },
  { name: 'Bread Loaf', price: 40 },
  { name: 'Eggs (12 pcs)', price: 90 },
  { name: 'Rice 1kg', price: 85 },
  { name: 'Tomatoes 500g', price: 30 },
  { name: 'Onions 1kg', price: 45 },
  { name: 'Cooking Oil 1L', price: 180 },
  { name: 'Sugar 1kg', price: 50 },
  { name: 'Tea Powder 250g', price: 120 },
  { name: 'Biscuits Pack', price: 35 },
];

const generateUID = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const DevTools = ({ trolleyId, onLocalUpdate }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  if (!trolleyId) {
    return null;
  }

  const handleSimulateScan = async () => {
    setIsSimulating(true);

    try {
      const trolleyRef = ref(database, `/trolleys/${trolleyId}`);
      
      // Get current data
      const snapshot = await get(trolleyRef);
      const currentData = snapshot.val() || {
        items: [],
        runningTotal: 0,
        budgetLimit: 1000,
        budgetExceeded: false,
        deviceStatus: 'online',
        lastUpdated: Date.now()
      };

      // Pick a random product
      const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
      
      // Create new item with unique ID
      const newItem = {
        uid: generateUID(),
        name: randomProduct.name,
        price: randomProduct.price,
        timestamp: Date.now()
      };

      // Update items array (newest at beginning)
      const updatedItems = [newItem, ...(currentData.items || [])];
      
      // Calculate new total
      const newTotal = (currentData.runningTotal || 0) + randomProduct.price;
      
      // Check if budget exceeded
      const budgetLimit = currentData.budgetLimit || 1000;
      const budgetExceeded = newTotal > budgetLimit;

      // Write to Firebase
      await update(trolleyRef, {
        items: updatedItems,
        runningTotal: newTotal,
        budgetExceeded: budgetExceeded,
        deviceStatus: 'online',
        lastUpdated: Date.now()
      });

      toast.success(`Added ${randomProduct.name} - ₹${randomProduct.price}`);

    } catch (error) {
      console.log('Firebase not available, using local simulation:', error.message);
      
      // Firebase not available - use local callback
      if (onLocalUpdate) {
        const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
        const newItem = {
          uid: generateUID(),
          name: randomProduct.name,
          price: randomProduct.price,
          timestamp: Date.now()
        };
        
        onLocalUpdate({ type: 'ADD_ITEM', item: newItem });
        toast.success(`Added ${randomProduct.name} - ₹${randomProduct.price} (local only)`);
      } else {
        toast.error('Cannot simulate scan - Firebase not configured');
      }
    } finally {
      setIsSimulating(false);
    }
  };

  const handleResetSession = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the session? This will clear all items and reset the running total to ₹0.'
    );

    if (!confirmed) return;

    setIsSimulating(true);

    try {
      const trolleyRef = ref(database, `/trolleys/${trolleyId}`);
      
      // Get current budget limit to preserve it
      const snapshot = await get(trolleyRef);
      const currentData = snapshot.val() || {};
      const budgetLimit = currentData.budgetLimit || 1000;

      await update(trolleyRef, {
        items: [],
        runningTotal: 0,
        budgetExceeded: false,
        budgetLimit: budgetLimit,
        deviceStatus: 'online',
        lastUpdated: Date.now()
      });

      toast.success('Session reset successfully!');

    } catch (error) {
      console.log('Firebase not available, using local reset:', error.message);
      
      // Firebase not available - use local callback
      if (onLocalUpdate) {
        onLocalUpdate({ type: 'RESET' });
        toast.success('Session reset (local only)!');
      } else {
        toast.error('Cannot reset - Firebase not configured');
      }
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="dev-tools">
      <div className="dev-tools-header">
        <span className="dev-badge">DEV TOOLS</span>
        <span className="dev-warning">⚠️ Development Only</span>
      </div>
      <div className="dev-tools-actions">
        <button 
          onClick={handleSimulateScan}
          disabled={isSimulating}
          className="btn-simulate"
        >
          {isSimulating ? 'Scanning...' : '🛒 Simulate Scan'}
        </button>
        <button 
          onClick={handleResetSession}
          disabled={isSimulating}
          className="btn-reset"
        >
          {isSimulating ? 'Resetting...' : '🔄 Reset Session'}
        </button>
      </div>
    </div>
  );
};

export default DevTools;
