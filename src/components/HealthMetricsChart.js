import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const HealthMetricsChart = ({ metrics }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (metrics && metrics.length > 0) {
      const dates = metrics.map((metric) => new Date(metric.date).toLocaleDateString());
      const exerciseData = metrics.map((metric) => metric.exerciseMinutes);
      const caloriesData = metrics.map((metric) => metric.caloriesConsumed);
      const sleepData = metrics.map((metric) => metric.sleepHours);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Exercise Minutes',
            data: exerciseData,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.2, // Adding tension for smooth curves
          },
          {
            label: 'Calories Consumed',
            data: caloriesData,
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
            tension: 0.2,
          },
          {
            label: 'Sleep Hours',
            data: sleepData,
            borderColor: 'rgba(54,162,235,1)',
            fill: false,
            tension: 0.2,
          },
        ],
      });
      setLoading(false);
    } else {
      setLoading(false);
      setError('No metrics data available.'); // Change error message
    }
  }, [metrics]);

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div>
      <h2>Health Metrics Trends</h2>
      {loading ? (
        <p>Loading chart data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default HealthMetricsChart;
