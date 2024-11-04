import React, { useEffect, useState } from 'react';

const HealthMetricsOverview = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/health-metrics/map', { // Updated URL
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
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
      <h2>Health Metrics Overview</h2>
      <ul>
        {metrics.length === 0 ? (
          <li>No metrics recorded yet.</li>
        ) : (
          metrics.map((metric) => (
            <li key={metric._id}>
              Date: {new Date(metric.date).toLocaleDateString()} - 
              Exercise: {metric.exerciseMinutes} mins, 
              Calories: {metric.caloriesConsumed}, 
              Sleep: {metric.sleepHours} hours
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HealthMetricsOverview;
