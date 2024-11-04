// HealthMetricsOverview.js
import React from 'react';

const HealthMetricsOverview = ({ metrics }) => {
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
