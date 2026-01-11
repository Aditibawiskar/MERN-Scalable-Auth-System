import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items', config);
      setItems(res.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items', newItem, config);
      setNewItem({ name: '', description: '', price: '' });
      fetchItems();
    } catch (err) {
      alert('Error adding item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, config);
      fetchItems();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={{ margin: 0 }}>Dashboard <span style={styles.roleTag}>{role.toUpperCase()}</span></h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </nav>

      <div style={styles.content}>
        {/* ADMIN SECTION */}
        {role === 'admin' && (
          <div style={styles.section}>
            <h3>Add New Item</h3>
            <form onSubmit={handleAddItem} style={styles.formRow}>
              <input 
                placeholder="Item Name" 
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                style={styles.input} required 
              />
              <input 
                placeholder="Description" 
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                style={styles.inputLarge} required 
              />
              <input 
                type="number" placeholder="Price" 
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                style={styles.inputSmall} required 
              />
              <button type="submit" style={styles.addBtn}>Add +</button>
            </form>
          </div>
        )}

        {/* ITEMS LIST */}
        <div style={styles.section}>
          <h3>Available Items</h3>
          <div style={styles.grid}>
            {items.length === 0 ? <p>No items found.</p> : (
              items.map((item) => (
                <div key={item._id} style={styles.itemCard}>
                  <div style={styles.itemHeader}>
                    <strong>{item.name}</strong>
                    <span style={styles.priceTag}>${item.price}</span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.9em' }}>{item.description}</p>
                  
                  {role === 'admin' && (
                    <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>
                      Delete Item
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Full Screen Professional Styles
// REPLACE THE ENTIRE 'styles' OBJECT AT THE BOTTOM OF DASHBOARD.JSX WITH THIS:

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw', // Forces full viewport width
    backgroundColor: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden' // Prevents horizontal scrolling
  },
  navbar: {
    backgroundColor: '#1f1f1f',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    width: '100%',
    boxSizing: 'border-box' // Important for alignment
  },
  roleTag: {
    fontSize: '0.6em',
    backgroundColor: '#646cff',
    padding: '2px 8px',
    borderRadius: '10px',
    marginLeft: '10px',
    verticalAlign: 'middle'
  },
  content: {
    padding: '40px',
    width: '100%', // Forces content to take full width
    boxSizing: 'border-box' // Ensures padding doesn't break width
  },
  section: {
    marginBottom: '40px',
    width: '100%' // Ensures sections take full width
  },
  formRow: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    backgroundColor: '#1f1f1f',
    padding: '25px',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center'
  },
  input: {
    flex: 1, // Grows to fill space
    minWidth: '200px',
    padding: '12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    color: 'white',
    borderRadius: '4px',
    fontSize: '16px'
  },
  inputLarge: {
    flex: 2, // Grows twice as much as normal input
    minWidth: '300px',
    padding: '12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    color: 'white',
    borderRadius: '4px',
    fontSize: '16px'
  },
  inputSmall: {
    width: '120px',
    padding: '12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    color: 'white',
    borderRadius: '4px',
    fontSize: '16px'
  },
  addBtn: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    height: '100%'
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    // This makes cards fill the width automatically
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
    width: '100%'
  },
  itemCard: {
    backgroundColor: '#1f1f1f',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  priceTag: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  deleteBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(220, 53, 69, 0.1)', // Transparent red
    border: '1px solid #dc3545',
    color: '#dc3545',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};

export default Dashboard;