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
    return <p style={styles.loading}>Loading metrics...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div className="mt-5 mb-5" style={styles.container}>
      <h1 style={styles.title}>Health Metrics Dashboard</h1>
      <div style={styles.chartContainer}>
        <HealthMetricsChart metrics={metrics} />
      </div>
      <HealthMetricsOverview metrics={metrics} />
    </div>
  );
};

const styles = {
    container: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "1px solid rgba(0, 0, 0, 0.1)", // Add a light border
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Keep the shadow
    },
    title: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "1.5rem",
      textAlign: "center",
      fontWeight: "600",
    },
    chartContainer: {
      marginBottom: "2rem",
      padding: "1rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    loading: {
      fontSize: "1.25rem",
      color: "#777",
      textAlign: "center",
      marginTop: "2rem",
    },
    error: {
      color: "#d9534f",
      textAlign: "center",
      fontSize: "1.25rem",
      marginTop: "2rem",
    },
  };
  
export default HealthMetrics;
