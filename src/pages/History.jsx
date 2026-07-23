import { useState } from 'react';
import { useUserTrolley } from '../hooks/useUserTrolley';
import { useSessionHistory } from '../hooks/useSessionHistory';
import './History.css';

const History = () => {
  const { trolleyId, loading: trolleyLoading } = useUserTrolley();
  const { sessions, loading: historyLoading } = useSessionHistory(trolleyId);
  const [expandedSession, setExpandedSession] = useState(null);

  const toggleSession = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (trolleyLoading || historyLoading) {
    return (
      <div className="history-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading history...</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="history-container">
        <h1>Shopping History</h1>
        <div className="empty-state">
          <div className="empty-icon">📜</div>
          <h2>No Past Sessions</h2>
          <p>Your shopping history will appear here after you checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1>Shopping History</h1>
      <p className="history-subtitle">View your past shopping sessions</p>

      <div className="history-list">
        {sessions.map((session) => (
          <div key={session.sessionId} className="history-card">
            <div 
              className="history-card-header"
              onClick={() => toggleSession(session.sessionId)}
            >
              <div className="history-info">
                <div className="history-date">
                  {formatDate(session.checkedOutAt)}
                </div>
                <div className="history-stats">
                  <span className="stat-item">
                    {session.items?.length || 0} items
                  </span>
                  <span className="stat-divider">•</span>
                  <span className="stat-item">
                    ₹{session.finalTotal?.toFixed(2) || '0.00'}
                  </span>
                  {session.budgetExceeded && (
                    <>
                      <span className="stat-divider">•</span>
                      <span className="stat-exceeded">⚠️ Budget Exceeded</span>
                    </>
                  )}
                </div>
              </div>
              <button className="expand-button">
                {expandedSession === session.sessionId ? '▲' : '▼'}
              </button>
            </div>

            {expandedSession === session.sessionId && (
              <div className="history-card-body">
                <div className="session-details">
                  <div className="detail-row">
                    <span className="detail-label">Budget Limit:</span>
                    <span className="detail-value">₹{session.budgetLimit?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Final Total:</span>
                    <span className="detail-value total">₹{session.finalTotal?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>

                <h4>Items Purchased</h4>
                <div className="items-list">
                  {session.items && session.items.length > 0 ? (
                    session.items.map((item, index) => (
                      <div key={item.uid || index} className="item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">₹{item.price?.toFixed(2) || '0.00'}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">No items in this session</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
