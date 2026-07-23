import { useState, useEffect } from 'react';
import './DeviceStatus.css';

const DeviceStatus = ({ lastUpdated }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const timeSinceUpdate = Date.now() - lastUpdated;
      setIsOnline(timeSinceUpdate <= 10000); // 10 seconds threshold
    };

    // Check immediately
    checkStatus();

    // Check every 3 seconds
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="device-status">
      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
      <span className="status-label">
        Device {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default DeviceStatus;
