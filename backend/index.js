import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongodb from "./connection.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
// import matchRoutes from './routes/match.routes.js';
import mailRoutes from './routes/mailRoute.js';
import fundingRoutes from './routes/fundingRoutes.js';

dotenv.config();
const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.CORS_ORIGIN ,'http://localhost:5173', 'http://127.0.0.1'];
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow no origin (when the request is made by the server itself, for example)
            callback(null, true);
        } else {
            callback(new Error('CORS policy does not allow this origin.'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // This is important to allow credentials
    optionsSuccessStatus: 204, // For legacy browsers
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));


app.use('/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/funding', fundingRoutes);
// app.use('/api/match', matchRoutes);

app.get("/",(req, res) => {res.status(200).json({"message":"backend working"});});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectMongodb(MONGO_URI);


