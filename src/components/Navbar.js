import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HealthHub</Link>
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
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/demo">Demo Page</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health-metrics">Health Metrics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/log-metrics">Log Metrics</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* Logout and User Profile */}
            {location.pathname !== '/demo' && (
              <>
                <li className="nav-item">
                  <Logout /> {/* Logout button placed here */}
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Profile
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/user-profile">User Profile</Link>
                    </li>
                  </ul>
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
