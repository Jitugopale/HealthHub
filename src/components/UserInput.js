import React from 'react';

const UserInput = () => {
  // Inline styles
  const userInputStyle = {
    backgroundColor: '#f4f4f9', // Light background for contrast
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '1000px', // Limit width for readability
    margin: '20px auto', // Center the component
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
  };

  const headerStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const metricStyle = {
    marginBottom: '15px',
    borderBottom: '1px solid #ccc', // Divider line
    paddingBottom: '15px', // Space below each metric
  };

  const metricHeaderStyle = {
    color: '#007bff', // Attractive color for headings
  };

  const metricTextStyle = {
    color: '#555',
    lineHeight: '1.6', // Improve readability
  };

  return (
    <div style={userInputStyle}>
      <h2 style={headerStyle}>Your Health Metrics Input</h2>

      <div style={metricStyle}>
        <h3 style={metricHeaderStyle}>Exercise Minutes</h3>
        <p style={metricTextStyle}>
          Exercise minutes refer to the amount of time spent engaging in physical activity. Regular exercise is crucial for maintaining a healthy lifestyle, as it helps improve cardiovascular health, build strength, and boost mental well-being. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week for optimal health benefits.
        </p>
      </div>

      <div style={metricStyle}>
        <h3 style={metricHeaderStyle}>Calories Consumed</h3>
        <p style={metricTextStyle}>
          Calories consumed represent the total energy intake from food and beverages. Monitoring calorie intake is essential for weight management, as consuming more calories than your body burns can lead to weight gain. It's important to focus on nutrient-dense foods that provide essential vitamins and minerals while being mindful of portion sizes.
        </p>
      </div>

      <div style={metricStyle}>
        <h3 style={metricHeaderStyle}>Sleep Hours</h3>
        <p style={metricTextStyle}>
          Sleep hours indicate the amount of time spent sleeping each night. Quality sleep is vital for physical health, mental clarity, and emotional well-being. Adults typically require 7-9 hours of sleep per night. Poor sleep can impact mood, cognitive function, and overall health, so it's essential to prioritize good sleep hygiene for better rest and recovery.
        </p>
      </div>

      <div style={metricStyle}>
        <h3 style={metricHeaderStyle}>Weight</h3>
        <p style={metricTextStyle}>
          Weight is a measure of body mass, typically expressed in kilograms or pounds. It can be influenced by various factors including diet, exercise, and genetics. Maintaining a healthy weight is important for overall health, and regular monitoring can help track changes over time. Aim for a weight that is appropriate for your height and body composition.
        </p>
      </div>

      <div style={metricStyle}>
        <h3 style={metricHeaderStyle}>Blood Pressure</h3>
        <p style={metricTextStyle}>
          Blood pressure is the force of blood against the walls of your arteries. It is measured in millimeters of mercury (mmHg) and expressed as two numbers: systolic (the pressure when the heart beats) over diastolic (the pressure when the heart rests between beats). Maintaining a healthy blood pressure is crucial for reducing the risk of heart disease and stroke. Regular monitoring can help detect any potential issues early.
        </p>
      </div>
    </div>
  );
};

export default UserInput;
