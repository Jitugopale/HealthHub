import React, { useState } from 'react';

const TrackProgress = ({ userId, metrics }) => {
  const [suggestions, setSuggestions] = useState('');

  const calculateAverages = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      setSuggestions('No data available to calculate improvements.');
      return null;
    }

    const totalMetrics = metrics.length;
    const averages = metrics.reduce((acc, metric) => {
      acc.weight += metric.weight || 0;
      acc.height += metric.height || 0;
      acc.exerciseMinutes += metric.exerciseMinutes || 0;
      acc.caloriesConsumed += metric.caloriesConsumed || 0;
      acc.sleepHours += metric.sleepHours || 0;
      acc.bloodPressure += (metric.bloodPressure || 0);
      return acc;
    }, { weight: 0, height: 0, exerciseMinutes: 0, caloriesConsumed: 0, sleepHours: 0, bloodPressure: 0 });

    return {
      weight: (averages.weight / totalMetrics).toFixed(2),
      height: (averages.height / totalMetrics).toFixed(2),
      exerciseMinutes: (averages.exerciseMinutes / totalMetrics).toFixed(2),
      caloriesConsumed: (averages.caloriesConsumed / totalMetrics).toFixed(2),
      sleepHours: (averages.sleepHours / totalMetrics).toFixed(2),
      bloodPressure: (averages.bloodPressure / totalMetrics).toFixed(2),
    };
  };

  const calculateImprovements = () => {
    const averageMetrics = calculateAverages();
    if (!averageMetrics) return;

    const { weight, height, exerciseMinutes, caloriesConsumed, sleepHours, bloodPressure } = averageMetrics;

    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmr = 10 * weight + 6.25 * height - 5 * 30 + 5; // Using an average age of 30
    const calorieNeeds = bmr * 1.2; // Sedentary activity level

    let improvementSuggestions = 'Based on your metrics:\n\n';
    let hasDiscrepancy = false;

    // Check BMI
    if (bmi < 18.5) {
      improvementSuggestions += '🔹 You are underweight. Consider increasing your caloric intake.\n';
      hasDiscrepancy = true;
    } else if (bmi >= 25 && bmi < 30) {
      improvementSuggestions += '🔹 You are overweight. Consider a balanced diet and regular exercise.\n';
      hasDiscrepancy = true;
    } else if (bmi >= 30) {
      improvementSuggestions += '🔹 You are obese. It is important to consult a healthcare provider for guidance.\n';
      hasDiscrepancy = true;
    } else {
      improvementSuggestions += '🔹 You have a normal weight. Keep up the good work!\n';
    }

    // Check exercise minutes
    if (exerciseMinutes < 150) {
      improvementSuggestions += '🔹 You should aim for at least 150 minutes of moderate exercise weekly.\n';
      hasDiscrepancy = true;
    }

    // Check caloric intake
    if (caloriesConsumed < 1200) {
      improvementSuggestions += '🔹 Your caloric intake is too low. Ensure you are eating enough to meet your energy needs.\n';
      hasDiscrepancy = true;
    } else if (caloriesConsumed > calorieNeeds) {
      improvementSuggestions += '🔹 You are consuming more calories than your needs. Consider reducing portions or increasing activity levels.\n';
      hasDiscrepancy = true;
    }

    // Check sleep
    if (sleepHours < 7) {
      improvementSuggestions += '🔹 Aim for 7-9 hours of sleep per night for optimal health.\n';
      hasDiscrepancy = true;
    }

    // Check blood pressure
    if (bloodPressure < 90 || bloodPressure > 120) {
      improvementSuggestions += '🔹 Your blood pressure readings are outside the normal range. Consult with a healthcare provider for advice.\n';
      hasDiscrepancy = true;
    }

    // Check if there are any discrepancies
    if (!hasDiscrepancy) {
      improvementSuggestions += '🔹 All metrics are within normal ranges. Keep up the good work!\n';
    }

    setSuggestions(improvementSuggestions);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Track Your Progress</h2>
      <button onClick={calculateImprovements} style={styles.button}>Track Progress</button>
      <div style={styles.suggestionsContainer}>
        <h3 style={styles.suggestionsTitle}>Suggestions for Improvement:</h3>
        <p style={styles.suggestionsText}>{suggestions}</p>
      </div>
    </div>
  );
};

// Styles remain unchanged
const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '15px',
    background: 'linear-gradient(145deg, #f0f5f9, #d9e2ec)',
    boxShadow: 'inset 4px 4px 10px rgba(0, 0, 0, 0.1), inset -4px -4px 10px rgba(255, 255, 255, 0.7)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '2rem',
    color: '#2a3b47',
    marginBottom: '20px',
    fontWeight: '600',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '12px 25px',
    borderRadius: '25px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 4px 10px rgba(74, 144, 226, 0.3), inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
    marginBottom: '30px',
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: 'inset 4px 4px 10px rgba(0, 0, 0, 0.1), inset -4px -4px 10px rgba(255, 255, 255, 0.7)',
    textAlign: 'left',
    marginTop: '20px',
    transition: 'transform 0.3s ease',
  },
  suggestionsTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
    fontWeight: '600',
  },
  suggestionsText: {
    fontSize: '1rem',
    color: '#555',
    whiteSpace: 'pre-line',
  },
};

export default TrackProgress;
