import { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './StoreAnalytics.css';

const StoreAnalytics = () => {
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const historyRef = ref(database, '/sessionHistory');
    
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const sessions = [];
        
        Object.entries(value).forEach(([trolleyId, trolleySessions]) => {
          Object.entries(trolleySessions).forEach(([sessionId, data]) => {
            sessions.push({
              sessionId,
              trolleyId,
              ...data
            });
          });
        });
        
        setAllSessions(sessions.sort((a, b) => b.checkedOutAt - a.checkedOutAt));
      } else {
        setAllSessions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Revenue over time (last 30 days)
  const revenueData = useMemo(() => {
    const last30Days = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentSessions = allSessions.filter(s => s.checkedOutAt >= last30Days);
    
    const dailyRevenue = {};
    recentSessions.forEach(session => {
      const date = new Date(session.checkedOutAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      dailyRevenue[date] = (dailyRevenue[date] || 0) + (session.finalTotal || 0);
    });
    
    return Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue: parseFloat(revenue.toFixed(2))
    })).slice(-14); // Last 14 days
  }, [allSessions]);

  // Top-selling products store-wide
  const topProducts = useMemo(() => {
    const productCounts = {};
    
    allSessions.forEach(session => {
      if (session.items) {
        session.items.forEach(item => {
          if (productCounts[item.name]) {
            productCounts[item.name]++;
          } else {
            productCounts[item.name] = 1;
          }
        });
      }
    });
    
    return Object.entries(productCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allSessions]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = allSessions.reduce((sum, s) => sum + (s.finalTotal || 0), 0);
    const totalSessions = allSessions.length;
    const totalItems = allSessions.reduce((sum, s) => sum + (s.items?.length || 0), 0);
    const avgBasketSize = totalSessions > 0 ? totalItems / totalSessions : 0;
    
    return {
      totalRevenue,
      totalSessions,
      totalItems,
      avgBasketSize
    };
  }, [allSessions]);

  if (loading) {
    return <div className="loading">Loading store analytics...</div>;
  }

  if (allSessions.length === 0) {
    return (
      <div className="empty-state">
        <p>No store data available yet.</p>
      </div>
    );
  }

  return (
    <div className="store-analytics-container">
      <h2>Store Analytics</h2>
      <p className="subtitle">Aggregate data across all customers</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">₹{stats.totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalSessions}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalItems}</div>
          <div className="stat-label">Items Sold</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgBasketSize.toFixed(1)}</div>
          <div className="stat-label">Avg Basket Size</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Over Time (Last 14 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top 10 Products (Store-Wide)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" name="Times Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StoreAnalytics;
