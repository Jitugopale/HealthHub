import React, { useState, useEffect } from 'react';
import TrackProgress from './TrackProgress';
import axios from 'axios';

const MetricsContainer = ({ userId }) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!userId) return; // Prevent fetch if userId is undefined
      try {
        const response = await axios.get(`http://localhost:5000/api/health-metrics/getMetricsByUserId/${userId}`);
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [userId]);

  const calculateAverages = (metricsArray) => {
    if (metricsArray.length === 0) return {};

    const total = metricsArray.reduce(
      (acc, curr) => {
        acc.weight += curr.weight;
        acc.exerciseMinutes += curr.exerciseMinutes;
        acc.caloriesConsumed += curr.caloriesConsumed;
        acc.sleepHours += curr.sleepHours;
        acc.bloodPressure += curr.bloodPressure;
        return acc;
      },
      { weight: 0, exerciseMinutes: 0, caloriesConsumed: 0, sleepHours: 0, bloodPressure: 0 }
    );

    const count = metricsArray.length;

    return {
      weight: total.weight / count,
      exerciseMinutes: total.exerciseMinutes / count,
      caloriesConsumed: total.caloriesConsumed / count,
      sleepHours: total.sleepHours / count,
      bloodPressure: total.bloodPressure / count,
    };
  };

  const averageMetrics = calculateAverages(metrics);

  return (
    <div>
      <h1>Your Health Metrics</h1>
      <TrackProgress userId={userId} metrics={[averageMetrics]} />
    </div>
  );
};

export default MetricsContainer;
