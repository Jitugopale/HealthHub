import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserInput from "./components/UserInput";
import Navbar from "./components/Navbar";
import HealthMetrics from "./components/HealthMetrics"; // Import the HealthMetrics wrapper component
import LogMetrics from "./components/LogMetrics";
import Home from "./components/Home";
import './App.css';
import MetricsContainer from "./components/MetricsContainer";
import OTPInput from "./components/OTPInput";
import Recovered from "./components/Recovered";
import Reset from "./components/Reset";
import OTPVerification from './components/OTPVerification';

import { RecoveryProvider } from "./RecoveryContext"; // Correct the import here

const App = () => {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  // This function helps navigate between different recovery pages based on the 'page' state
  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    return <Recovered />;
  }

  return (
    <Router>
      {/* Wrap your app with RecoveryProvider */}
      <RecoveryProvider value={{ page, setPage, otp, setOTP, setEmail, email }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-input"
            element={
              <ProtectedRoute>
                <Navbar />
                <UserInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/health-metrics"
            element={
              <ProtectedRoute>
                <Navbar />
                <HealthMetrics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-metrics"
            element={
              <ProtectedRoute>
                <Navbar />
                <LogMetrics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-progress"
            element={
              <ProtectedRoute>
                <Navbar />
                <MetricsContainer /> {/* Correctly set up TrackProgress route */}
              </ProtectedRoute>
            }
          />
          
          {/* Password Recovery Routes */}
          <Route path="/recover-password" element={<NavigateComponents />} />
          <Route path="/recover-password/otp" element={<NavigateComponents />} />
          <Route path="/recover-password/reset" element={<NavigateComponents />} />
          <Route path="/recover-password/recovered" element={<NavigateComponents />} />
        </Routes>
      </RecoveryProvider>
    </Router>
  );
};

export default App;
