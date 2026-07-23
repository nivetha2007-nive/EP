import { useState, useEffect } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from '../firebase';

export const useAllTrolleys = () => {
  const [trolleys, setTrolleys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trolleysRef = ref(database, '/trolleys');
    
    const unsubscribe = onValue(trolleysRef, async (snapshot) => {
      const value = snapshot.val();
      if (value) {
        // Convert object to array with trolley IDs
        const trolleysArray = await Promise.all(
          Object.entries(value).map(async ([trolleyId, data]) => {
            // Fetch owner email if ownerUid exists
            let ownerEmail = 'Unknown';
            if (data.ownerUid) {
              const userRef = ref(database, `/users/${data.ownerUid}`);
              const userSnapshot = await get(userRef);
              if (userSnapshot.exists()) {
                ownerEmail = userSnapshot.val().email;
              }
            }

            return {
              trolleyId,
              ...data,
              ownerEmail
            };
          })
        );
        
        setTrolleys(trolleysArray);
      } else {
        setTrolleys([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { trolleys, loading };
};
