import React, { useState, useEffect } from 'react';
import TrackProgress from './TrackProgress';

const MetricsContainer = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchMetrics = async () => {
      const fetchedMetrics = [
        { weight: 70, exerciseMinutes: 30, caloriesConsumed: 2500, sleepHours: 6, bloodPressure: 130 },
        // Add more metric objects as needed
      ];
      setMetrics(fetchedMetrics);
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      <h1>Your Health Metrics</h1>
      <TrackProgress metrics={metrics} />
    </div>
  );
};

export default MetricsContainer;
