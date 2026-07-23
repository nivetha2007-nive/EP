import './BudgetBar.css';

const BudgetBar = ({ runningTotal, budgetLimit }) => {
  const percentage = budgetLimit > 0 ? (runningTotal / budgetLimit) * 100 : 0;
  const cappedPercentage = Math.min(percentage, 100);
  
  let barClass = 'bar-fill';
  if (percentage >= 100) {
    barClass += ' over-budget';
  } else if (percentage >= 80) {
    barClass += ' near-budget';
  } else {
    barClass += ' under-budget';
  }

  return (
    <div className="budget-bar">
      <div className="budget-info">
        <span className="budget-label">Budget Progress</span>
        <span className="budget-values">
          ₹{runningTotal.toFixed(0)} / ₹{budgetLimit.toFixed(0)}
        </span>
      </div>
      <div className="bar-container">
        <div 
          className={barClass}
          style={{ width: `${cappedPercentage}%` }}
        />
      </div>
      <div className="percentage-label">{percentage.toFixed(1)}%</div>
    </div>
  );
};

export default BudgetBar;
