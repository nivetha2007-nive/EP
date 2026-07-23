import { useMemo } from 'react';
import { useUserTrolley } from '../hooks/useUserTrolley';
import { useSessionHistory } from '../hooks/useSessionHistory';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const { trolleyId, loading: trolleyLoading } = useUserTrolley();
  const { sessions, loading: historyLoading } = useSessionHistory(trolleyId);

  // Process data for spend per session chart
  const spendData = useMemo(() => {
    return sessions.map((session, index) => ({
      session: `Session ${sessions.length - index}`,
      total: session.finalTotal || 0,
      budget: session.budgetLimit || 0,
      date: new Date(session.checkedOutAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    })).reverse();
  }, [sessions]);

  // Process data for top products chart
  const topProducts = useMemo(() => {
    const productCounts = {};
    
    sessions.forEach(session => {
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
      .slice(0, 5);
  }, [sessions]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalSpent = sessions.reduce((sum, s) => sum + (s.finalTotal || 0), 0);
    const totalSessions = sessions.length;
    const avgSpend = totalSessions > 0 ? totalSpent / totalSessions : 0;
    const budgetExceededCount = sessions.filter(s => s.budgetExceeded).length;

    return {
      totalSpent,
      totalSessions,
      avgSpend,
      budgetExceededCount
    };
  }, [sessions]);

  if (trolleyLoading || historyLoading) {
    return (
      <div className="analytics-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="analytics-container">
        <h1>Analytics</h1>
        <div className="empty-state">
          <div className="empty-icon">📈</div>
          <h2>No Data Yet</h2>
          <p>Complete some shopping sessions to see your analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <h1>Shopping Analytics</h1>
      <p className="analytics-subtitle">Insights into your shopping patterns</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">₹{stats.totalSpent.toFixed(2)}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalSessions}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹{stats.avgSpend.toFixed(2)}</div>
          <div className="stat-label">Average Spend</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.budgetExceededCount}</div>
          <div className="stat-label">Budget Exceeded</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Spend Per Session</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#667eea" strokeWidth={2} name="Total Spent" />
              <Line type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top 5 Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#667eea" name="Times Purchased" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
