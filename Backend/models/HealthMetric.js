const mongoose = require('mongoose');

// Define the schema for health metrics
const healthMetricSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    exerciseMinutes: { 
        type: Number, 
        required: true 
    },
    caloriesConsumed: { 
        type: Number, 
        required: true 
    },
    sleepHours: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

// Define a method to get a formatted metric entry
healthMetricSchema.methods.format = function() {
    return {
        id: this._id,
        userId: this.userId,
        exerciseMinutes: this.exerciseMinutes,
        caloriesConsumed: this.caloriesConsumed,
        sleepHours: this.sleepHours,
        date: this.date.toISOString().split('T')[0] // Format date as YYYY-MM-DD
    };
};

// Export the model
module.exports = mongoose.model('HealthMetric', healthMetricSchema);
