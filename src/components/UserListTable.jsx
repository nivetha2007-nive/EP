import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import './UserListTable.css';

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(database, '/users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const usersArray = Object.entries(value).map(([uid, data]) => ({
          uid,
          email: data.email,
          role: data.role || 'customer',
          trolleyIds: data.trolleyIds || [],
          createdAt: data.createdAt || 0
        })).sort((a, b) => b.createdAt - a.createdAt);
        
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <p className="subtitle">All registered users (read-only)</p>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Trolleys</th>
              <th>Joined</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                  </span>
                </td>
                <td>{user.trolleyIds.length}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td><code>{user.uid.substring(0, 8)}...</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-note">
        <strong>Note:</strong> To promote a user to admin, manually update their role in the Firebase Console under <code>/users/{'{uid}'}/role</code>.
      </div>
    </div>
  );
};

export default UserListTable;
