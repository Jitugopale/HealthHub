import React, { useState } from 'react';

const LogMetrics = () => {
  const [form, setForm] = useState({
    exerciseMinutes: '',
    caloriesConsumed: '',
    sleepHours: ''
  });
  const [metricsLog, setMetricsLog] = useState([]); // State to hold the logged metrics

  const handleLog = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    console.log("Token fetched:", token);

    try {
      const response = await fetch('http://localhost:5000/api/health-metrics/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert('Metrics logged successfully: ' + data.message);

      setMetricsLog((prevLog) => [
        ...prevLog,
        {
          date: new Date().toLocaleString(),
          exerciseMinutes: form.exerciseMinutes,
          caloriesConsumed: form.caloriesConsumed,
          sleepHours: form.sleepHours,
        },
      ]);
      setForm({ exerciseMinutes: '', caloriesConsumed: '', sleepHours: '' });
    } catch (error) {
      console.error('Error logging metrics', error);
      alert('Failed to log metrics: ' + error.message);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        textAlign: 'center',
        color: '#4A90E2',
        marginBottom: '20px'
      }}>Log Your Health Metrics</h2>

      <form onSubmit={handleLog} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="number"
          placeholder="Exercise Minutes"
          value={form.exerciseMinutes}
          onChange={(e) => setForm({ ...form, exerciseMinutes: e.target.value })}
          style={{
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          type="number"
          placeholder="Calories Consumed"
          value={form.caloriesConsumed}
          onChange={(e) => setForm({ ...form, caloriesConsumed: e.target.value })}
          style={{
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          type="number"
          placeholder="Sleep Hours"
          value={form.sleepHours}
          onChange={(e) => setForm({ ...form, sleepHours: e.target.value })}
          style={{
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            marginTop: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#357ABD'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4A90E2'}
        >
          Log Metrics
        </button>
      </form>

      <h3 style={{
        fontSize: '1.2rem',
        marginTop: '20px',
        color: '#4A90E2',
        borderBottom: '1px solid #ddd',
        paddingBottom: '5px'
      }}>Logged Metrics:</h3>
      <ul style={{
        listStyle: 'none',
        padding: '0',
        marginTop: '10px'
      }}>
        {metricsLog.map((metric, index) => (
          <li key={index} style={{
            padding: '10px',
            backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#e6f7ff',
            borderRadius: '5px',
            marginBottom: '5px',
            fontSize: '0.9rem'
          }}>
            <strong>Date:</strong> {metric.date} <br />
            <strong>Exercise:</strong> {metric.exerciseMinutes} mins, 
            <strong>Calories:</strong> {metric.caloriesConsumed}, 
            <strong>Sleep:</strong> {metric.sleepHours} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogMetrics;
