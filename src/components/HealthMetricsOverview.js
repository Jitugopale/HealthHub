import React from 'react';
import Swal from 'sweetalert2';

const HealthMetricsOverview = ({ metrics, handleDelete }) => {
  
  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire('Deleted!', 'Your health metric has been deleted.', 'success');
      }
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Health Metrics Overview</h2>
      <ul style={styles.list}>
        {metrics.length === 0 ? (
          <li style={styles.listItem}>No metrics recorded yet.</li>
        ) : (
          metrics.map((metric) => (
            <li key={metric._id} style={styles.listItem}>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Date:</span>
                <span style={styles.value}>{new Date(metric.date).toLocaleDateString()}</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Exercise:</span>
                <span style={styles.value}>{metric.exerciseMinutes} mins</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Calories:</span>
                <span style={styles.value}>{metric.caloriesConsumed}</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Sleep:</span>
                <span style={styles.value}>{metric.sleepHours} hours</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Weight:</span>
                <span style={styles.value}>{metric.weight} kg</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Blood Pressure:</span>
                <span style={styles.value}>{metric.bloodPressure}</span>
              </div>
              <div style={styles.metricContainer}>
                <span style={styles.label}>Height:</span> {/* Display height */}
                <span style={styles.value}>{metric.height} cm</span>
              </div>
              <button style={styles.deleteButton} onClick={() => confirmDelete(metric._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Styles remain the same
const styles = {
  container: {
    padding: "1.5rem",
    backgroundColor: "#e6f7ff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "0 auto",
    color: "#000",
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
    display: "flex",
    flexDirection: "column",
  },
  metricContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    padding: '0 1rem',
    width: '100%',
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    flex: '1',
  },
  value: {
    flex: '1',
    textAlign: 'center',
  },
  deleteButton: {
    padding: "0.3rem 0.6rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
    marginTop: '1rem',
  },
};

export default HealthMetricsOverview;
