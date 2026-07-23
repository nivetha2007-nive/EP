import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

export const useSessionHistory = (trolleyId) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trolleyId) {
      setLoading(false);
      return;
    }

    const historyRef = ref(database, `/sessionHistory/${trolleyId}`);
    
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        // Convert object to array and sort by checkedOutAt (newest first)
        const sessionsArray = Object.entries(value).map(([sessionId, data]) => ({
          sessionId,
          ...data
        })).sort((a, b) => b.checkedOutAt - a.checkedOutAt);
        
        setSessions(sessionsArray);
      } else {
        setSessions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [trolleyId]);

  return { sessions, loading };
};
