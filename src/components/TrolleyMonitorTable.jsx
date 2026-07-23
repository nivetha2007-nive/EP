import { useState, useEffect } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from '../firebase';
import './TrolleyMonitorTable.css';

const TrolleyMonitorTable = () => {
  const [trolleys, setTrolleys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trolleysRef = ref(database, '/trolleys');
    
    const unsubscribe = onValue(trolleysRef, async (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const trolleysArray = await Promise.all(
          Object.entries(value).map(async ([trolleyId, data]) => {
            let ownerEmail = 'Unknown';
            if (data.ownerUid) {
              try {
                const userRef = ref(database, `/users/${data.ownerUid}`);
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                  ownerEmail = userSnapshot.val().email;
                }
              } catch (error) {
                console.error('Error fetching user:', error);
              }
            }

            const isOnline = (Date.now() - (data.lastUpdated || 0)) <= 10000;

            return {
              trolleyId,
              ownerEmail,
              runningTotal: data.runningTotal || 0,
              itemCount: data.items?.length || 0,
              status: data.status || 'active',
              lastUpdated: data.lastUpdated || 0,
              isOnline
            };
          })
        );
        
        setTrolleys(trolleysArray.sort((a, b) => b.lastUpdated - a.lastUpdated));
      } else {
        setTrolleys([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading trolleys...</div>;
  }

  if (trolleys.length === 0) {
    return (
      <div className="empty-state">
        <p>No active trolleys found.</p>
      </div>
    );
  }

  return (
    <div className="trolley-monitor-container">
      <h2>Live Trolley Monitor</h2>
      <p className="subtitle">Real-time view of all trolleys in the system</p>

      <div className="table-wrapper">
        <table className="trolley-table">
          <thead>
            <tr>
              <th>Trolley ID</th>
              <th>Owner</th>
              <th>Items</th>
              <th>Current Total</th>
              <th>Status</th>
              <th>Device</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {trolleys.map((trolley) => (
              <tr key={trolley.trolleyId}>
                <td><code>{trolley.trolleyId}</code></td>
                <td>{trolley.ownerEmail}</td>
                <td>{trolley.itemCount}</td>
                <td className="total">₹{trolley.runningTotal.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${trolley.status}`}>
                    {trolley.status}
                  </span>
                </td>
                <td>
                  <span className={`device-badge ${trolley.isOnline ? 'online' : 'offline'}`}>
                    <span className="dot"></span>
                    {trolley.isOnline ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="time">{formatTime(trolley.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrolleyMonitorTable;
