const connectToMongo = require('./db');
const cors = require('cors'); // Import CORS
const express = require('express');

connectToMongo();
const app = express();
const port = 5000; // Define the port directly

// Enable CORS for all routes
app.use(cors()); // Use CORS middleware

app.use(express.json()); // Middleware to parse JSON bodies

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/health-metrics', require('./routes/healthMetrics')); // Add health metrics route


// app.get('/api/healthMetrics', async (req, res) => {
//   try {
//     // Assume metrics are fetched from a database
//     const metrics = await getHealthMetrics(); // Replace with actual data fetching logic
//     res.json(metrics);
//   } catch (error) {
//     console.error('Error fetching health metrics:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
