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
      acc.weight += metric.weight;
      acc.height += metric.height; // Accumulate height
      acc.exerciseMinutes += metric.exerciseMinutes;
      acc.caloriesConsumed += metric.caloriesConsumed;
      acc.sleepHours += metric.sleepHours;
      acc.bloodPressure += metric.bloodPressure;
      return acc;
    }, { weight: 0, height: 0, exerciseMinutes: 0, caloriesConsumed: 0, sleepHours: 0, bloodPressure: 0 });

    // Calculate averages
    return {
      weight: (averages.weight / totalMetrics).toFixed(2),
      height: (averages.height / totalMetrics).toFixed(2), // Calculate average height
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

    // Ensure height is in meters for BMI calculation
    const bmi = weight / (height * height);
    const bmr = 10 * weight + 6.25 * (height * 100) - 5 * 30 + 5; // For men (age = 30)
    const calorieNeeds = bmr * 1.2;

    let improvementSuggestions = 'Based on your metrics:\n\n';

    // BMI suggestions
    if (bmi < 18.5) {
      improvementSuggestions += '🔹 You are underweight. Consider a balanced diet with more calories.\n';
    } else if (bmi < 24.9) {
      improvementSuggestions += '🔹 You have a normal weight. Keep up the balanced diet and regular exercise.\n';
    } else if (bmi < 29.9) {
      improvementSuggestions += '🔹 You are overweight. A calorie deficit could help with weight loss.\n';
    } else {
      improvementSuggestions += '🔹 You are obese. It’s advisable to consult a healthcare provider for a personalized plan.\n';
    }

    // Exercise suggestions
    if (exerciseMinutes < 150) {
      improvementSuggestions += '🔹 Aim for at least 150 minutes of moderate exercise weekly.\n';
    }

    // Caloric intake suggestions
    if (caloriesConsumed > calorieNeeds) {
      improvementSuggestions += '🔹 Consider reducing portions or increasing activity levels to manage your calorie intake.\n';
    }

    // Sleep suggestions
    if (sleepHours < 7) {
      improvementSuggestions += '🔹 Aim for 7-9 hours of sleep per night for optimal health.\n';
    }

    // Blood pressure suggestions
    if (bloodPressure > 120) {
      improvementSuggestions += '🔹 Monitor your sodium intake and consult a healthcare provider if necessary.\n';
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
    fontWeight: 'bold',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
  },
  suggestionsText: {
    fontSize: '1rem',
    color: '#555',
    whiteSpace: 'pre-line',
    lineHeight: '1.6',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.05)',
  },
};

export default TrackProgress;
