// HealthMetrics.js
import React, { useEffect, useState } from "react";
import HealthMetricsChart from "./HealthMetricsChart";
import HealthMetricsOverview from "./HealthMetricsOverview";

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log("Token fetched:", token);
      try {
        const response = await fetch('http://localhost:5000/api/health-metrics/map', {
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        setError('Failed to load metrics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <p>Loading metrics...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h1>Health Metrics Dashboard</h1>
      <div style={{ marginBottom: "2rem" }}>
        <HealthMetricsChart metrics={metrics} />
      </div>
      <HealthMetricsOverview metrics={metrics} />
    </div>
  );
};

export default HealthMetrics;

