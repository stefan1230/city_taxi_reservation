const express = require('express');
const { Booking, User } = require('../models');
const router = express.Router();

// Create a new booking
router.post('/book', async (req, res) => {
    const { passengerId, driverId, pickupLocation, destination, fare } = req.body;

    try {
        const booking = await Booking.create({
            passengerId,
            driverId,
            pickupLocation,
            destination,
            fare,
        });

        res.json({ message: 'Booking created successfully', booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
