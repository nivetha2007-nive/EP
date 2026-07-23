import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAllTrolleys } from '../hooks/useAllTrolleys';
import { ref, set, remove, get, onValue } from 'firebase/database';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import ProductTable from '../components/ProductTable';
import TrolleyMonitorTable from '../components/TrolleyMonitorTable';
import UserListTable from '../components/UserListTable';
import StoreAnalytics from '../components/StoreAnalytics';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p className="admin-subtitle">Manage products, monitor trolleys, and view analytics</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
        <button 
          className={`tab-button ${activeTab === 'trolleys' ? 'active' : ''}`}
          onClick={() => setActiveTab('trolleys')}
        >
          🛒 Live Trolleys
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Store Analytics
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && <ProductTable />}
        {activeTab === 'trolleys' && <TrolleyMonitorTable />}
        {activeTab === 'users' && <UserListTable />}
        {activeTab === 'analytics' && <StoreAnalytics />}
      </div>
    </div>
  );
};

export default Admin;
