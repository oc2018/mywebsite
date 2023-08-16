import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import cors from 'cors';

import msgRoutes from './routes/message.routes.js';
import projectRoutes from './routes/project.routes.js';
import { baseURL } from '../admin/src/util/backendUrl.js';

env.config();

const app = express();
app.use(cors({ origin:`https://www.ericndege.com/` `https://mywebsite-backend-fe.vercel.app/` }));
app.use(express.json());
app.use('/api/msg', msgRoutes);
app.use('/api/project', projectRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my website')
});

const port = process.env.PORT || 4000;

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION_URL)
        app.listen(port, () => console.log(`server running on port ${ port }`));
    } catch (error) {
        console.log(error);
    }
}

connectDB();