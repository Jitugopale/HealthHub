import React, { useState } from 'react';

const LogMetrics = () => {
  const [form, setForm] = useState({
    exerciseMinutes: '',
    caloriesConsumed: '',
    sleepHours: ''
  });

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
          'Authorization': `Bearer ${token}`, // Include the token for authorization
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // If needed to handle response
      alert('Metrics logged successfully: ' + data.message); // Optionally show the success message
      setForm({ exerciseMinutes: '', caloriesConsumed: '', sleepHours: '' }); // Reset the form
    } catch (error) {
      console.error('Error logging metrics', error);
      alert('Failed to log metrics: ' + error.message); // Inform the user
    }
  };

  return (
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
  );
};

export default LogMetrics;
