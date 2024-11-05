const express = require('express');
const HealthMetric = require('../models/HealthMetric');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

// Log health metrics (protected route)
router.post('/log', fetchuser, async (req, res) => {
    const { exerciseMinutes, caloriesConsumed, sleepHours, weight, bloodPressure } = req.body;

    // Validate incoming data
    if (exerciseMinutes == null || caloriesConsumed == null || sleepHours == null || weight == null || bloodPressure == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create new health metric document
        const newMetric = new HealthMetric({
            userId: req.user.id,
            exerciseMinutes,
            caloriesConsumed,
            sleepHours,
            weight,  // Added weight
            bloodPressure,  // Added blood pressure
        });

        // Save the new metric to the database
        await newMetric.save();

        // Respond with the created metric
        res.status(201).json({
            message: 'Metrics logged successfully',
            metric: newMetric.format(), // Use the format method for a cleaner response
        });
    } catch (error) {
        console.error('Error logging metrics:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to log metrics', details: error.message }); // Include error details
    }
});

// Fetch user's health metrics
router.get('/map', fetchuser, async (req, res) => {
    try {
        // Fetch health metrics associated with the logged-in user
        const userMetrics = await HealthMetric.find({ userId: req.user.id });
  
        if (!userMetrics || userMetrics.length === 0) {
            return res.status(404).json({ error: 'No health metrics found' });
        }

        res.json(userMetrics);
    } catch (error) {
        console.error('Error fetching health metrics:', error);
        res.status(500).json({ error: 'Failed to fetch health metrics' });
    }
});

// Delete a specific health metric
router.delete('/:id', fetchuser, async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the health metric by ID and user ID
        const deletedMetric = await HealthMetric.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedMetric) {
            return res.status(404).json({ error: 'Health metric not found or not authorized' });
        }

        res.json({ message: 'Health metric deleted successfully' });
    } catch (error) {
        console.error('Error deleting health metric:', error);
        res.status(500).json({ error: 'Failed to delete health metric' });
    }
});

router.get('/getMetricsByUserId/:userId',fetchuser, async (req, res) => {
    const { userId } = req.params;
  
    try {
      const metrics = await HealthMetric.find({ userId }); // Fetch metrics based on userId
      if (!metrics.length) {
        return res.status(404).json({ message: 'No metrics found for this user ID' });
      }
      res.json(metrics);
    } catch (error) {
      console.error('Error fetching metrics by user ID:', error);
      res.status(500).json({ message: 'Server error while fetching metrics by user ID' });
    }
  });
  
module.exports = router;
