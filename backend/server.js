const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
 
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/writers-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you're using cookies
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadDir = process.env.ASSET_PATH || path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use('/assets', express.static('D:/assets'));
app.use('/uploads', express.static(uploadDir));


// Import Routes
const authRoutes = require('./routes/authRoutes');


// Route Middleware
app.use('/api/auth', authRoutes);


// API Status Endpoint
app.get('/api', (req, res) => {
  res.json({
    status: '✅ API is working',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        validateToken: 'GET /api/auth/validate-token',
      },
      upload: 'POST /api/upload'
    },
    note: 'Endpoints except for /api/auth/register and /api/auth/login require authentication'
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: `❌ Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '❌ Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 API docs at http://localhost:${PORT}/api`);
});