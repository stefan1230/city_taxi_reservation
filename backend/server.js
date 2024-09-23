const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');  // Importing Sequelize instance
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const driverRoutes = require('./routes/driver');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/driver', driverRoutes);

// Test route to ensure the server is running
app.get('/', (req, res) => {
    res.send('City Taxi Reservation API is running');
});

// Connect to the database and start the server
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // Ensures models are synced with the database
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
