import React from "react";
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
import TrackProgress from "./components/TrackProgress"; // Importing TrackProgress

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
              <TrackProgress /> {/* Correctly set up TrackProgress route */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
