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
    
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    console.log("Token fetched:", token); // Log the token here to check its value

    try {
      const response = await fetch('http://localhost:5000/api/health-metrics/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token, // Include the token for authorization
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // Handle response if needed
      alert('Metrics logged successfully: ' + data.message); // Optionally show the success message

      // Add the new metrics to the log
      setMetricsLog((prevLog) => [
        ...prevLog,
        {
          date: new Date().toLocaleString(),
          exerciseMinutes: form.exerciseMinutes,
          caloriesConsumed: form.caloriesConsumed,
          sleepHours: form.sleepHours,
        },
      ]);
      setForm({ exerciseMinutes: '', caloriesConsumed: '', sleepHours: '' }); // Reset the form
    } catch (error) {
      console.error('Error logging metrics', error);
      alert('Failed to log metrics: ' + error.message); // Inform the user
    }
  };

  return (
    <div>
      <form onSubmit={handleLog}>
        <input
          type="number"
          placeholder="Exercise Minutes"
          value={form.exerciseMinutes}
          onChange={(e) => setForm({ ...form, exerciseMinutes: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories Consumed"
          value={form.caloriesConsumed}
          onChange={(e) => setForm({ ...form, caloriesConsumed: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sleep Hours"
          value={form.sleepHours}
          onChange={(e) => setForm({ ...form, sleepHours: e.target.value })}
        />
        <button type="submit">Log Metrics</button>
      </form>

      {/* Display the logged metrics */}
      <h3>Logged Metrics:</h3>
      <ul>
        {metricsLog.map((metric, index) => (
          <li key={index}>
            Date: {metric.date} - Exercise: {metric.exerciseMinutes} mins, 
            Calories: {metric.caloriesConsumed}, Sleep: {metric.sleepHours} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogMetrics;
