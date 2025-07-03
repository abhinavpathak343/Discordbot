import express from 'express';
import cors from 'cors';
import {
    config
} from 'dotenv';
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import urlRouter from './routes/url.js';
import mongoose from 'mongoose';
import {
    handleRedirectURL
} from './controllers/url.js';

// Load environment variables
config();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const port = 8080;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173||process.env.vercel_url'

}));
app.use(express.json());

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Mount the URL router at /api/url
app.use('/api/shortlink', urlRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/:shortId', handleRedirectURL);