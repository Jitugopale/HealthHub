import React from 'react';

const HealthMetricsOverview = ({ metrics }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Health Metrics Overview</h2>
      <ul style={styles.list}>
        {metrics.length === 0 ? (
          <li style={styles.listItem}>No metrics recorded yet.</li>
        ) : (
          metrics.map((metric) => (
            <li key={metric._id} style={styles.listItem}>
              <span style={styles.date}>Date:</span> {new Date(metric.date).toLocaleDateString()} - 
              <span style={styles.label}>Exercise:</span> {metric.exerciseMinutes} mins, 
              <span style={styles.label}>Calories:</span> {metric.caloriesConsumed}, 
              <span style={styles.label}>Sleep:</span> {metric.sleepHours} hours
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "1.5rem",
    backgroundColor: "#e6f7ff", // Light, attractive pastel blue
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
    color: "#000", // Black text for readability
  },
  header: {
    fontSize: "1.75rem",
    color: "#333",
    marginBottom: "1rem",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: "#ffffff",
    padding: "0.75rem",
    borderRadius: "6px",
    marginBottom: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    color: "#000",
    fontSize: "1rem",
  },
  date: {
    fontWeight: "bold",
  },
  label: {
    fontWeight: "normal",
    color: "#555",
  },
};

export default HealthMetricsOverview;
