import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, '/products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        // Convert object to array
        const productsArray = Object.entries(value).map(([uid, data]) => ({
          uid,
          ...data
        }));
        
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { products, loading };
};
