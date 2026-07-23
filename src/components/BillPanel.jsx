import { useState, useEffect, useRef } from 'react';
import './BillPanel.css';

const BillPanel = ({ items }) => {
  const [highlightedItem, setHighlightedItem] = useState(null);
  const prevItemsLengthRef = useRef(items.length);

  useEffect(() => {
    // Detect new item added (newest is at index 0)
    if (items.length > prevItemsLengthRef.current && items.length > 0) {
      const newestItem = items[0];
      setHighlightedItem(newestItem.uid);
      
      // Remove highlight after 1.5s
      const timer = setTimeout(() => {
        setHighlightedItem(null);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    prevItemsLengthRef.current = items.length;
  }, [items]);

  return (
    <div className="bill-panel">
      <h2>Shopping Bill</h2>
      <div className="bill-items">
        {items.length === 0 ? (
          <p className="empty-message">No items scanned yet</p>
        ) : (
          items.map((item) => (
            <div
              key={item.uid}
              className={`bill-item ${highlightedItem === item.uid ? 'highlight' : ''}`}
            >
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillPanel;
