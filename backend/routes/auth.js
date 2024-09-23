const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!['passenger', 'driver'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role selected' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        const token = jwt.sign({ id: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !user.validPassword(password)) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Return role in response
        res.send({ message: 'Login successful', token, role: user.role, id: user.id });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
});


module.exports = router;
