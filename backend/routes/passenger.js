const express = require('express');
const { Booking, User, Vehicle, Rating } = require('../models');
const router = express.Router();

// Get upcoming rides for a passenger
router.get('/upcoming/:passengerId', async (req, res) => {
    try {
        const { passengerId } = req.params;

        const passenger = await User.findByPk(passengerId);

        if (!passenger || passenger.role !== 'passenger') {
            return res.status(404).json({ message: 'Passenger not found' });
        }

        const upcomingRides = await Booking.findAll({
            where: { passengerId: passengerId, status: 'CONFIRMED' },
            include: [
                { model: User, as: 'driver', attributes: ['name', 'location'] }
            ],
        });

        res.status(200).json({ upcomingRides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get ride history for a passenger
router.get('/history/:passengerId', async (req, res) => {
    try {
        const { passengerId } = req.params;

        const passenger = await User.findByPk(passengerId);

        if (!passenger || passenger.role !== 'passenger') {
            return res.status(404).json({ message: 'Passenger not found' });
        }

        const rideHistory = await Booking.findAll({
            where: { passengerId: passengerId, status: ['CONFIRMED', 'CANCELLED', 'COMPLETED'] },
            include: [
                { model: User, as: 'driver', attributes: ['name'] }
            ],
        });

        res.status(200).json({ rideHistory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Book a ride
router.post('/book', async (req, res) => {
    try {
        const { passengerId, driverId, pickupLocation, destination, fare } = req.body;

        // Validate passenger and driver
        const passenger = await User.findByPk(passengerId);
        const driver = await User.findByPk(driverId);

        if (!passenger || passenger.role !== 'passenger') {
            return res.status(404).json({ message: 'Passenger not found' });
        }

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Create a new booking
        const newBooking = await Booking.create({
            passengerId,
            driverId,
            pickupLocation,
            destination,
            fare,
            status: 'REQUESTED'
        });

        res.status(201).json({ message: 'Ride booked successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get available drivers based on passenger's location
router.get('/drivers/:location', async (req, res) => {
    try {
        const { location } = req.params;

        const availableDrivers = await User.findAll({
            where: { role: 'driver', driverStatus: 'AVAILABLE' },
            attributes: ['id', 'name', 'location'],
            // You may need to implement geolocation logic here to find nearby drivers.
        });

        res.status(200).json({ availableDrivers });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// Rate a driver
router.post('/rate', async (req, res) => {
    try {
        const { passengerId, driverId, rating } = req.body;

        const passenger = await User.findByPk(passengerId);
        const driver = await User.findByPk(driverId);

        if (!passenger || passenger.role !== 'passenger') {
            return res.status(404).json({ message: 'Passenger not found' });
        }

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const ratingRecord = await Rating.create({ passengerId, driverId, rating });

        res.status(201).json({ message: 'Rating submitted successfully', rating: ratingRecord });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



router.get('/available-drivers', async (req, res) => {
    try {
        const availableDrivers = await User.findAll({
            where: {
                role: 'driver',
                driverStatus: 'AVAILABLE',
            },
            include: [{ model: Vehicle, as: 'vehicles' }], // Include vehicle details
            attributes: ['id', 'name', 'location']  // Include driver details
        });

        res.status(200).json(availableDrivers);
    } catch (error) {
        console.error('Error fetching available drivers:', error);
        res.status(500).json({ message: 'Error fetching available drivers' });
    }
});



router.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error signing out' });
        }

        res.status(200).json({ message: 'Signed out successfully' });
    });
});


module.exports = router;

