import express from 'express';
import cors, { CorsOptions } from 'cors';
import { connectToDatabase } from './services/database.service';
import cartRoutes from './routes/cart.routes';

const app = express();
const port = 3030;

const allowedOrigins = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
    origin: allowedOrigins
};

connectToDatabase()
    .then(() => {
        app.use(cors(corsOptions));
        app.use(express.json());

        app.get('/', (req, res) => {
            res.send('Hello dark little world...');
        });

        app.use('/cart', cartRoutes);

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Database connection failed!', error);
        process.exit();
    });

