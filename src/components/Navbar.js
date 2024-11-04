import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import UserProfile from './UserProfile';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">HealthHub</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-input">User Input</Link> {/* Updated to point to User Input */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health-metrics">Health Metrics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/log-metrics">Log Metrics</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {location.pathname !== '/demo' && (
              <>
                <li className="nav-item" style={{marginRight:'80px'}}>
                  <Logout /> {/* Logout button placed here */}
                </li>
                <li className="nav-item">
                    <UserProfile/>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
