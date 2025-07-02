import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI || '')
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log('Server running on ');
        })
    })
    .catch((err) => console.error('MongoDB connection error:', err));