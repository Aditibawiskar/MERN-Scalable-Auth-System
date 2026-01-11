import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      alert('Login Successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="email" name="email" placeholder="Email" 
              onChange={handleChange} required 
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password" name="password" placeholder="Password" 
              onChange={handleChange} required 
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          New user? <Link to="/register" style={{ color: '#646cff' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

// CSS Styles Object
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#242424', // Dark background to match theme
    color: 'white',
    position: 'absolute', // Ensures it covers the whole screen
    top: 0,
    left: 0
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)', // Nice shadow effect
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
    boxSizing: 'border-box' // Ensures padding doesn't break width
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
    transition: 'background 0.3s'
  }
};

export default Login;