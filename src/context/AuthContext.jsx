import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('budgetcart_user');
    const savedRole = localStorage.getItem('budgetcart_role');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole || 'customer');
    }
    setLoading(false);
  }, []);

  const signup = async (email, password) => {
    // Mock signup - just create a user object
    const mockUser = {
      uid: 'user_' + Date.now(),
      email: email,
    };
    
    // Save to localStorage
    localStorage.setItem('budgetcart_user', JSON.stringify(mockUser));
    localStorage.setItem('budgetcart_role', 'customer');
    
    setUser(mockUser);
    setRole('customer');
    
    return { user: mockUser };
  };

  const login = async (email, password) => {
    // Mock login - accept any email/password
    const mockUser = {
      uid: 'user_' + Date.now(),
      email: email,
    };
    
    // Check if email contains 'admin' to make them admin
    const userRole = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    
    // Save to localStorage
    localStorage.setItem('budgetcart_user', JSON.stringify(mockUser));
    localStorage.setItem('budgetcart_role', userRole);
    
    setUser(mockUser);
    setRole(userRole);
    
    return { user: mockUser };
  };

  const logout = async () => {
    // Clear localStorage
    localStorage.removeItem('budgetcart_user');
    localStorage.removeItem('budgetcart_role');
    
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
