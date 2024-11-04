import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Demopage from "./components/Demopage";
import Navbar from "./components/Navbar";
import HealthMetrics from "./components/HealthMetrics"; // Import the HealthMetrics wrapper component
import LogMetrics from "./components/LogMetrics";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/select"
          element={
            <ProtectedRoute>
              <Navbar />
              <Demopage />
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
      </Routes>
    </Router>
  );
};

export default App;
