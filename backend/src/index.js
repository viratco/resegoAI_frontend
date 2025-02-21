
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth.routes.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS with specific options
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // Allow both localhost variations
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
