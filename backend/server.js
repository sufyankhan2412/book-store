const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
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

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ===== Import Routes =====
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const favoritesRoutes = require('./routes/favorites');

// ===== Route Middleware =====
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoritesRoutes);

// File upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    filePath: `/uploads/${req.file.filename}`
  });
});

// ===== API Status Endpoint =====
app.get('/api', (req, res) => {
  res.json({
    status: '✅ API is working',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        validateToken: 'GET /api/auth/validate-token',
      },
      users: {
        profile: 'GET /api/users/profile',
        update: 'PUT /api/users/profile',
        validate: 'GET /api/users/validate',
      },
      cart: {
        get: 'GET /api/cart',
        update: 'POST /api/cart',
        clear: 'DELETE /api/cart',
        remove: 'DELETE /api/cart/:bookId'
      },
      favorites: {
        get: 'GET /api/favorites',
        toggle: 'POST /api/favorites',
        check: 'GET /api/favorites/:bookId'
      },
      books: {
        getAll: 'GET /api/books',
        getOne: 'GET /api/books/:id',
        create: 'POST /api/books',
        update: 'PATCH /api/books/:id',
        delete: 'DELETE /api/books/:id',
      },
      upload: 'POST /api/upload'
    },
    note: 'Endpoints except for /api/auth/register and /api/auth/login require authentication'
  });
});

// ===== 404 Not Found Handler =====
app.use((req, res) => {
  res.status(404).json({ message: `❌ Route ${req.originalUrl} not found` });
});

// ===== Global Error Handler =====
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
