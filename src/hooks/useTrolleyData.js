import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const SESSION_ID = 'session1';

export const useTrolleyData = () => {
  const [data, setData] = useState({
    items: [],
    runningTotal: 0,
    budgetLimit: 1000,
    budgetExceeded: false,
    deviceStatus: 'online',
    lastUpdated: Date.now()
  });

  useEffect(() => {
    const trolleyRef = ref(database, `/trolley/${SESSION_ID}`);
    
    const unsubscribe = onValue(trolleyRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setData({
          items: value.items || [],
          runningTotal: value.runningTotal || 0,
          budgetLimit: value.budgetLimit || 1000,
          budgetExceeded: value.budgetExceeded || false,
          deviceStatus: value.deviceStatus || 'online',
          lastUpdated: value.lastUpdated || Date.now()
        });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return data;
};
