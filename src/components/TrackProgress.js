import React, { useState } from 'react';

const TrackProgress = ({ metrics }) => {
  const [suggestions, setSuggestions] = useState('');

  const calculateImprovements = () => {
    // Check if metrics is defined and is an array
    if (!Array.isArray(metrics) || metrics.length === 0) {
      setSuggestions('No data available to calculate improvements.');
      return;
    }

    const lastMetric = metrics[metrics.length - 1];

    const { weight, exerciseMinutes, caloriesConsumed, sleepHours, bloodPressure } = lastMetric;

    // Calculate BMI (assuming height is known, e.g., 1.75m or 175cm)
    const height = 1.75; // Example height in meters
    const bmi = weight / (height * height);

    // Daily calorie needs calculation (using Mifflin-St Jeor Equation)
    const bmr = 10 * weight + 6.25 * (height * 100) - 5 * 30 + 5; // For men (age = 30)
    const calorieNeeds = bmr * 1.2; // Sedentary activity level

    // Suggest improvements
    let improvementSuggestions = '';

    // BMI Suggestion
    if (bmi < 18.5) {
      improvementSuggestions += 'You are underweight. Consider a balanced diet with more calories. Aim for strength training exercises to build muscle.\n';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      improvementSuggestions += 'You have a normal weight. Maintain a balanced diet and regular exercise.\n';
    } else if (bmi >= 25 && bmi < 29.9) {
      improvementSuggestions += 'You are overweight. Consider a calorie deficit and increase your physical activity.\n';
    } else {
      improvementSuggestions += 'You are obese. Consult a healthcare provider for a personalized plan.\n';
    }

    // Exercise Suggestion
    if (exerciseMinutes < 150) {
      improvementSuggestions += 'Aim for at least 150 minutes of moderate aerobic activity per week.\n';
    }

    // Caloric Intake Suggestion
    if (caloriesConsumed > calorieNeeds) {
      improvementSuggestions += 'You are consuming more calories than you burn. Consider reducing portion sizes or increasing activity levels.\n';
    } else if (caloriesConsumed < calorieNeeds) {
      improvementSuggestions += 'You are consuming fewer calories than you burn. Ensure you are getting enough nutrients.\n';
    }

    // Sleep Suggestion
    if (sleepHours < 7) {
      improvementSuggestions += 'Consider improving your sleep hygiene for better rest. Aim for 7-9 hours per night.\n';
    }

    // Blood Pressure Suggestion (assumed normal range is <120/80)
    if (bloodPressure > 120) {
      improvementSuggestions += 'Your blood pressure is above the normal range. Monitor your sodium intake and consult a healthcare provider.\n';
    }

    setSuggestions(improvementSuggestions);
  };

  return (
    <div>
      <h2>Track Your Progress</h2>
      <button onClick={calculateImprovements}>Track Progress</button>
      <div>
        <h3>Suggestions for Improvement:</h3>
        <p>{suggestions}</p>
      </div>
    </div>
  );
};

export default TrackProgress;
