const express = require('express');
const HealthMetric = require('../models/HealthMetric');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

// Log health metrics (protected route)
router.post('/log', fetchuser, async (req, res) => {
    const { exerciseMinutes, caloriesConsumed, sleepHours } = req.body;

    // Validate incoming data
    if (exerciseMinutes == null || caloriesConsumed == null || sleepHours == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create new health metric document
        const newMetric = new HealthMetric({
            userId: req.user.id,
            exerciseMinutes,
            caloriesConsumed,
            sleepHours,
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

router.get('/map',fetchuser, async (req, res) => {
    try {
      // Assume metrics are fetched from a database
      const metrics = await HealthMetric.find(); // Replace with actual data fetching logic
      res.json(metrics);
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
