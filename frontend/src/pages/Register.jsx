import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '20px' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" name="username" placeholder="Username" 
              onChange={handleChange} required 
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="email" name="email" placeholder="Email" 
              onChange={handleChange} required 
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="password" name="password" placeholder="Password" 
              onChange={handleChange} required 
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <select 
              name="role" onChange={handleChange} 
              style={styles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#646cff' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

// CSS Styles Object (Same as Login)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#242424',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#646cff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  }
};

export default Register;