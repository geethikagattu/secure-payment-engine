const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const productRoutes = require('./routes/products');

const app = express();

// CORS Configuration - UPDATE THIS PART
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});