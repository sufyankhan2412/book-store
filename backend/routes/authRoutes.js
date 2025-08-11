// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register a new user - POST /api/auth/register
router.post('/register', userController.registerUser);

// Login user - POST /api/auth/login
router.post('/login', userController.loginUser);

// Validate token - GET /api/auth/validate-token
// This should match what you defined in your API docs
router.get('/validate-token', auth, userController.validateToken);

// Adding this for backward compatibility if you're using it elsewhere
router.get('/verify', auth, userController.validateToken);

module.exports = router;