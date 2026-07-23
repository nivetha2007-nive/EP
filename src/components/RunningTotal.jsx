import './RunningTotal.css';

const RunningTotal = ({ total }) => {
  return (
    <div className="running-total">
      <div className="total-label">Total</div>
      <div className="total-amount">₹{total.toFixed(2)}</div>
    </div>
  );
};

export default RunningTotal;
