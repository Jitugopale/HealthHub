import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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
      const weightData = metrics.map((metric) => metric.weight);
      const bloodPressureData = metrics.map((metric) => metric.bloodPressure);
      const heightData = metrics.map((metric) => metric.height); // Add height data

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Exercise Minutes',
            data: exerciseData,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.2,
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
          {
            label: 'Weight (kg)',
            data: weightData,
            borderColor: 'rgba(255,205,86,1)',
            fill: false,
            tension: 0.2,
          },
          {
            label: 'Blood Pressure',
            data: bloodPressureData,
            borderColor: 'rgba(153,102,255,1)',
            fill: false,
            tension: 0.2,
          },
          {
            label: 'Height (cm)', // New height dataset
            data: heightData,
            borderColor: 'rgba(255,159,64,1)',
            fill: false,
            tension: 0.2,
          },
        ],
      });
      setLoading(false);
    } else {
      setLoading(false);
      setError('No metrics data available.');
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
        beginAtZero: true,
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
