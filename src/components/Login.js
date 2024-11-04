import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clickedFields, setClickedFields] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.data.authToken) {
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('userId', response.data.userId);
        setEmail(''); // Clear email field
        setPassword(''); // Clear password field
        console.log("Login successful, redirecting to Home...");
        navigate('/home');
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error('Login failed', error);
      setError(
        error.response?.data?.message || 
        'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = (field) => {
    setClickedFields((prev) => ({
      ...prev,
      [field]: true, // Set the clicked field to true
    }));
  };

  return (
    <div className="container contain-2 mt-5">
      <h2 className='heading-login'>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="alert alert-danger" aria-live="polite">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email">{clickedFields.email ? "Email" : ""}</label>
          <input
            type="email"
            className="form-control control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            onClick={() => handleInputClick('email')} // Track clicks on the email field
            placeholder={clickedFields.email ? "" : "Email"} // Clear placeholder if clicked
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">{clickedFields.password ? "Password" : ""}</label>
          <input
            type="password"
            className="form-control control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            onClick={() => handleInputClick('password')} // Track clicks on the password field
            placeholder={clickedFields.password ? "" : "Password"} // Clear placeholder if clicked
          />
        </div>
        <button type="submit" className="btn bn reflect bn-primary btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-3">
        <p>
          Not registered? <Link to="/register">Go to Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
