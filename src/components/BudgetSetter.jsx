import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import './BudgetSetter.css';

const BudgetSetter = ({ currentBudget, trolleyId, onBudgetUpdate }) => {
  if (!trolleyId) {
    return null;
  }
  const [budgetInput, setBudgetInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSetBudget = async () => {
    const newBudget = parseFloat(budgetInput);
    
    if (isNaN(newBudget) || newBudget <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    setIsUpdating(true);
    
    try {
      // Try Firebase first
      const trolleyRef = ref(database, `/trolleys/${trolleyId}`);
      await update(trolleyRef, {
        budgetLimit: newBudget
      });
      toast.success(`Budget set to ₹${newBudget.toFixed(0)}`);
      setBudgetInput('');
    } catch (error) {
      console.log('Firebase not available, using local budget:', error.message);
      
      // Firebase not available - use callback to update parent state
      if (onBudgetUpdate) {
        onBudgetUpdate(newBudget);
        toast.success(`Budget set to ₹${newBudget.toFixed(0)} (local only - won't persist on refresh)`);
        setBudgetInput('');
      } else {
        toast.error('Cannot update budget - Firebase not configured');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="budget-setter">
      <label htmlFor="budget-input">Set Budget Limit</label>
      <div className="budget-input-group">
        <input
          id="budget-input"
          type="number"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          placeholder={`Current: ₹${currentBudget.toFixed(0)}`}
          min="0"
          step="50"
          disabled={isUpdating}
        />
        <button 
          onClick={handleSetBudget}
          disabled={isUpdating || !budgetInput}
        >
          {isUpdating ? 'Updating...' : 'Set Budget'}
        </button>
      </div>
    </div>
  );
};

export default BudgetSetter;
