const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Add registration route
router.post('/', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            email,
            password,
            firstName,
            lastName
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            userId: user._id
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Existing profile route
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 