import { useState, useEffect } from 'react';
import './AlertBanner.css';

const AlertBanner = ({ budgetExceeded }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Reset dismissed state when a new budget exceeded event occurs
  useEffect(() => {
    if (budgetExceeded) {
      setIsDismissed(false);
    }
  }, [budgetExceeded]);

  if (!budgetExceeded || isDismissed) {
    return null;
  }

  return (
    <div className="alert-banner">
      <div className="alert-content">
        <span className="alert-icon">⚠️</span>
        <span className="alert-message">Budget limit exceeded!</span>
      </div>
      <button 
        className="alert-dismiss"
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss alert"
      >
        ✕
      </button>
    </div>
  );
};

export default AlertBanner;
