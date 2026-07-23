import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>🛒 BudgetCart</h2>
          <button className="mobile-close" onClick={closeMobileMenu}>✕</button>
        </div>

        <div className="user-info">
          <div className="user-email">{user?.email}</div>
          <span className={`role-badge ${role}`}>
            {role === 'admin' ? '👑 Admin' : '👤 Customer'}
          </span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" onClick={closeMobileMenu}>
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>

          <NavLink to="/history" onClick={closeMobileMenu}>
            <span className="nav-icon">📜</span>
            History
          </NavLink>

          <NavLink to="/analytics" onClick={closeMobileMenu}>
            <span className="nav-icon">📈</span>
            Analytics
          </NavLink>

          {role === 'admin' && (
            <NavLink to="/admin" onClick={closeMobileMenu}>
              <span className="nav-icon">⚙️</span>
              Admin
            </NavLink>
          )}
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </aside>

      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu} />
      )}
    </>
  );
};

export default Sidebar;
