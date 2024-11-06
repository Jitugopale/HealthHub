import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { useRecoveryContext } from '../RecoveryContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const { setRecoveryEmail } = useRecoveryContext(); // Destructure setRecoveryEmail

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.data.authToken) {
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('userId', response.data.userId);
        setEmail('');
        setPassword('');
        console.log('Login successful, redirecting to Home...');
        navigate('/home');
      } else {
        setError('Invalid login credentials.');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle password reset
  const handlePasswordReset = () => {
    if (email) {
      setRecoveryEmail(email); // Set the recovery email in the context

      axios
        .post('http://localhost:5000/api/auth/send_recovery_email', { email })
        .then((response) => {
          console.log(response.data);
          navigate('/otp-verification'); // Navigate to OTP Verification page directly
        })
        .catch((error) => {
          console.error('Error sending recovery email:', error);
          alert('Failed to send recovery email. Please try again later.');
        });
    } else {
      alert('Please enter your email to reset password');
    }
  };

  return (
    <div className="container contain-2 mt-5">
      <h2 className="heading-login">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-3">
          <Link to="/register">Don't have an account? Register</Link>
        </div>

        <div className="mt-3">
          <button type="button" onClick={handlePasswordReset} className="text-primary">
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
