// controllers/userController.js - Enhanced with debugging
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const mongoose = require('mongoose');

// Helper function to generate JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    console.error('[DEBUG] JWT_SECRET environment variable is not defined!');
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d' // Token expires in 7 days
  });
};

// Check MongoDB connection status
const checkDbConnection = async () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  console.log(`[DEBUG] MongoDB connection status: ${states[state] || 'unknown'}`);
  return state === 1; // 1 means connected
};

const userController = {
  // Register new user
  registerUser: async (req, res) => {
    try {
      // Check DB connection first
      const isConnected = await checkDbConnection();
      if (!isConnected) {
        console.error('[DEBUG] MongoDB is not connected when trying to register user');
        return res.status(500).json({ message: 'Database connection issue' });
      }

      console.log('[DEBUG] Registration attempt with data:', {
        name: req.body.name,
        email: req.body.email,
        passwordLength: req.body.password ? req.body.password.length : 0
      });

      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        console.log('[DEBUG] Missing required fields:', { 
          name: !name, 
          email: !email, 
          password: !password 
        });
        return res.status(400).json({ message: 'Please enter all fields' });
      }

      if (!validator.isEmail(email)) {
        console.log('[DEBUG] Invalid email format:', email);
        return res.status(400).json({ message: 'Invalid email format' });
      }

      if (password.length < 6) {
        console.log('[DEBUG] Password too short');
        return res.status(400).json({ 
          message: 'Password must be at least 6 characters' 
        });
      }

      // Check if user already exists
      const normalizedEmail = validator.normalizeEmail(email);
      console.log('[DEBUG] Checking if user exists with email:', normalizedEmail);
      
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        console.log('[DEBUG] User already exists with this email');
        return res.status(409).json({ message: 'User already exists with this email' });
      }

      // Create new user
      console.log('[DEBUG] Creating new user instance');
      const newUser = new User({
        name: validator.escape(name),
        email: normalizedEmail,
        password, // The User model will hash this in the pre-save hook
        cart: [],   // Initialize empty cart
        favorites: [] // Initialize empty favorites
      });

      // Save user to database with explicit error handling
      console.log('[DEBUG] Attempting to save user to database');
      try {
        await newUser.save();
        console.log('[DEBUG] User saved successfully with ID:', newUser._id);
      } catch (saveError) {
        console.error('[DEBUG] Error saving user:', saveError);
        // Check for specific MongoDB errors
        if (saveError.name === 'ValidationError') {
          console.error('[DEBUG] Validation error details:', saveError.errors);
          return res.status(400).json({ 
            message: 'Validation error', 
            details: Object.keys(saveError.errors).reduce((acc, key) => {
              acc[key] = saveError.errors[key].message;
              return acc;
            }, {})
          });
        }
        if (saveError.code === 11000) { // Duplicate key error
          console.error('[DEBUG] Duplicate key error');
          return res.status(409).json({ message: 'User already exists with this email' });
        }
        throw saveError; // Re-throw for general error handling
      }

      // Generate token
      const token = generateToken(newUser._id);
      console.log('[DEBUG] Generated token for new user');

      res.status(201).json({
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        },
        token
      });
    } catch (err) {
      console.error('[DEBUG] Registration error:', err);
      res.status(500).json({ message: 'Server error during registration', error: err.message });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      // Check DB connection first
      const isConnected = await checkDbConnection();
      if (!isConnected) {
        console.error('[DEBUG] MongoDB is not connected when trying to login');
        return res.status(500).json({ message: 'Database connection issue' });
      }

      console.log('[DEBUG] Login attempt for email:', req.body.email);
      
      const { email, password } = req.body;

      // Basic validation
      if (!email || !password) {
        console.log('[DEBUG] Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Check if user exists
      const normalizedEmail = validator.normalizeEmail(email);
      console.log('[DEBUG] Looking up user with normalized email:', normalizedEmail);
      
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        console.log('[DEBUG] User not found with email:', normalizedEmail);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      console.log('[DEBUG] Checking password for user:', user._id);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('[DEBUG] Password does not match for user:', user._id);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(user._id);
      console.log('[DEBUG] Login successful for:', email);
      console.log('[DEBUG] Generated token:', token.substring(0, 20) + '...');

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      });
    } catch (err) {
      console.error('[DEBUG] Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  // Validate token
  validateToken: async (req, res) => {
    try {
      console.log('[DEBUG] Validating token for user ID:', req.user.id);
      
      // Auth middleware already verified the token and attached user to req
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        console.log('[DEBUG] User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('[DEBUG] Token validated successfully for user:', user.email);
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error('[DEBUG] Token validation error:', err);
      res.status(500).json({ message: 'Server error during token validation' });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      console.log('[DEBUG] Getting profile for user ID:', req.user.id);
      
      const user = await User.findById(req.user.id)
        .select('-password')
        .populate('cart.bookId')
        .populate('favorites');

      if (!user) {
        console.log('[DEBUG] User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('[DEBUG] User profile retrieved successfully');
      res.json(user);
    } catch (err) {
      console.error('[DEBUG] Get profile error:', err);
      res.status(500).json({ message: 'Server error while fetching profile' });
    }
  },

  // Update user profile
  updateUserProfile: async (req, res) => {
    try {
      console.log('[DEBUG] Updating profile for user ID:', req.user.id);
      console.log('[DEBUG] Update data:', {
        name: req.body.name || '[not provided]',
        email: req.body.email || '[not provided]',
        password: req.body.password ? '[provided]' : '[not provided]'
      });
      
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) {
        console.log('[DEBUG] User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }

      // Update fields with validation
      if (name) user.name = validator.escape(name);
      if (email) {
        if (!validator.isEmail(email)) {
          console.log('[DEBUG] Invalid email format:', email);
          return res.status(400).json({ message: 'Invalid email format' });
        }
        user.email = validator.normalizeEmail(email);
      }
      if (password) {
        if (password.length < 6) {
          console.log('[DEBUG] Password too short');
          return res.status(400).json({ 
            message: 'Password must be at least 6 characters' 
          });
        }
        // Don't hash here - let the pre-save middleware do it
        user.password = password;
      }

      await user.save();
      console.log('[DEBUG] User profile updated successfully');

      res.json({
        id: user._id,
        name: user.name,
        email: user.email
      });
    } catch (err) {
      console.error('[DEBUG] Update profile error:', err);
      res.status(500).json({ message: 'Server error while updating profile' });
    }
  }
};

module.exports = userController;