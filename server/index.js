import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import cors from 'cors';

import msgRoutes from './routes/message.routes.js';
import projectRoutes from './routes/project.routes.js';
import userRoutes from './routes/user.routes.js';

env.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/msg', msgRoutes);
app.use('/api/project', projectRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my website')
});

const port = process.env.PORT || 4000;

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION_URL)
        app.listen(port, () => console.log(`server running on: http://localhost:${ port }`));
    } catch (error) {
        console.log(error);
    }
}

connectDB();