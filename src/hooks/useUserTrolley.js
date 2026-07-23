import { useState, useEffect } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../context/AuthContext';

export const useUserTrolley = () => {
  const { user } = useAuth();
  const [trolleyId, setTrolleyId] = useState(null);
  const [data, setData] = useState({
    items: [],
    runningTotal: 0,
    budgetLimit: 1000,
    budgetExceeded: false,
    deviceStatus: 'online',
    lastUpdated: Date.now(),
    status: 'active'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const findOrCreateTrolley = async () => {
      try {
        // Check if user has a trolley ID
        const userRef = ref(database, `/users/${user.uid}`);
        const userSnapshot = await get(userRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const trolleyIds = userData.trolleyIds || [];
          
          if (trolleyIds.length > 0) {
            // Use the first trolley (or find active one)
            setTrolleyId(trolleyIds[0]);
          } else {
            // Create a default trolley ID for this user
            const newTrolleyId = `trolley_${user.uid}`;
            setTrolleyId(newTrolleyId);
          }
        } else {
          // Firebase not connected or user doesn't exist - create mock trolley ID
          const mockTrolleyId = `trolley_${user.uid}`;
          setTrolleyId(mockTrolleyId);
        }
      } catch (error) {
        // Firebase error (not configured) - create mock trolley ID anyway
        console.log('Firebase not available, using mock trolley');
        const mockTrolleyId = `trolley_${user.uid}`;
        setTrolleyId(mockTrolleyId);
      }
    };

    findOrCreateTrolley();
  }, [user]);

  useEffect(() => {
    if (!trolleyId) {
      setLoading(false);
      return;
    }

    try {
      const trolleyRef = ref(database, `/trolleys/${trolleyId}`);
      
      const unsubscribe = onValue(trolleyRef, (snapshot) => {
        const value = snapshot.val();
        if (value) {
          setData({
            items: value.items || [],
            runningTotal: value.runningTotal || 0,
            budgetLimit: value.budgetLimit || 1000,
            budgetExceeded: value.budgetExceeded || false,
            deviceStatus: value.deviceStatus || 'online',
            lastUpdated: value.lastUpdated || Date.now(),
            status: value.status || 'active'
          });
        }
        setLoading(false);
      }, (error) => {
        console.log('Firebase listener error (database not configured):', error.message);
        // Keep default data and mark as loaded
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log('Firebase not available:', error.message);
      setLoading(false);
    }
  }, [trolleyId]);

  return { ...data, trolleyId, loading };
};
