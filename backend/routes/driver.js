const express = require('express');
const { Driver, Ride } = require('../models');  // Assuming Driver and Ride models are set up in Sequelize
const router = express.Router();
const { User, Booking } = require('../models');

// 1. Get Driver Status
// router.get('/:driverId/status', async (req, res) => {
//     try {
//         const driver = await Driver.findByPk(req.params.driverId);
//         if (!driver) return res.status(404).json({ message: 'Driver not found' });

//         res.json({ status: driver.status });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // 2. Update Driver Status
// router.post('/:driverId/status', async (req, res) => {
//     try {
//         const { status } = req.body;
//         const driver = await Driver.findByPk(req.params.driverId);
//         if (!driver) return res.status(404).json({ message: 'Driver not found' });

//         driver.status = status;
//         await driver.save();

//         res.json({ message: 'Driver status updated successfully', status: driver.status });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // 3. Get Upcoming Rides
// router.get('/:driverId/upcoming', async (req, res) => {
//     try {
//         const rides = await Ride.findAll({ where: { driverId: req.params.driverId, status: 'UPCOMING' } });
//         res.json(rides);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // 4. Get Ride History
// router.get('/:driverId/history', async (req, res) => {
//     try {
//         const rides = await Ride.findAll({ where: { driverId: req.params.driverId, status: 'COMPLETED' } });
//         res.json(rides);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // 5. Get Earnings Overview
// router.get('/:driverId/earnings', async (req, res) => {
//     try {
//         const rides = await Ride.findAll({ where: { driverId: req.params.driverId, status: 'COMPLETED' } });
//         const earnings = rides.reduce((acc, ride) => acc + ride.fare, 0);
//         res.json({ totalEarnings: earnings });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });


router.get('/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;

        // Find the driver by their ID
        const driver = await User.findByPk(driverId);

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json({ driverStatus: driver.driverStatus });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.put('/status', async (req, res) => {
    try {
        const { driverId, status } = req.body;

        if (!['AVAILABLE', 'BUSY'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const driver = await User.findByPk(driverId);

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        driver.driverStatus = status;
        await driver.save();

        res.status(200).json({ message: 'Status updated successfully', status: driver.driverStatus });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/upcoming/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;

        const driver = await User.findByPk(driverId);

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const upcomingRides = await Booking.findAll({
            where: { driverId: driverId, status: 'CONFIRMED' },
            include: [
                { model: User, as: 'passenger', attributes: ['name', 'location'] }
            ],
        });

        res.status(200).json({ upcomingRides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



router.get('/history/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        console.log(driverId)

        const driver = await User.findByPk(driverId);
        console.log(driver)

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const rideHistory = await Booking.findAll({
            where: { driverId: driverId, status: ['CONFIRMED', 'CANCELLED'] },
            include: [
                { model: User, as: 'passenger', attributes: ['name'] }
            ],
        });
        console.log(rideHistory)
        res.status(200).json({ rideHistory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/earnings/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;

        const confirmedRides = await Booking.findAll({
            where: { driverId: driverId, status: 'CONFIRMED' }
        });

        // Calculate total earnings
        const totalEarnings = confirmedRides.reduce((acc, ride) => acc + ride.fare, 0);

        // Example: Calculate daily, weekly, and monthly earnings (this can be more detailed)
        const dailyEarnings = totalEarnings;  // Example: you can filter rides based on the current date
        const weeklyEarnings = totalEarnings; // Example: you can filter rides based on the last 7 days
        const monthlyEarnings = totalEarnings; // Example: you can filter rides based on the current month

        res.status(200).json({ dailyEarnings, weeklyEarnings, monthlyEarnings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.put('/accept', async (req, res) => {
    try {
        const { bookingId, driverId } = req.body;

        const driver = await User.findByPk(driverId);

        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'CONFIRMED';
        booking.driverId = driverId; // Assign driver to booking
        await booking.save();

        res.status(200).json({ message: 'Booking confirmed', booking });
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
            attributes: ['id', 'name', 'location'],  // Select necessary fields
        });

        res.status(200).json(availableDrivers);
    } catch (error) {
        console.error('Error fetching available drivers:', error);
        res.status(500).json({ message: 'Error fetching available drivers' });
    }
});

router.put('/confirm-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByPk(bookingId);

        if (!booking || booking.status !== 'REQUESTED') {
            return res.status(404).json({ message: 'Booking not found or not in REQUESTED status' });
        }

        // Update the booking status to CONFIRMED
        booking.status = 'CONFIRMED';
        await booking.save();

        res.status(200).json({ message: 'Booking confirmed', booking });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ message: 'Error confirming booking' });
    }
});

router.get('/requested-bookings/:driverId', async (req, res) => {
    const { driverId } = req.params;

    try {
        const requestedBookings = await Booking.findAll({
            where: {
                driverId,
                status: 'REQUESTED',
            },
            include: [{ model: User, as: 'passenger', attributes: ['name', 'location'] }]  // Include passenger info
        });

        res.status(200).json(requestedBookings);
    } catch (error) {
        console.error('Error fetching requested bookings:', error);
        res.status(500).json({ message: 'Error fetching requested bookings' });
    }
});

module.exports = router;
