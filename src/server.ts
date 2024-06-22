import express from 'express';
import { connectToDatabase } from './services/database.service';
import cartRoutes from './routes/cart.routes';

const app = express();

const port = 3030;

connectToDatabase()
    .then(() => {
        app.get('/', (req, res) => {
            res.send('Hello dark little world...');
        });

        app.use('/cart', cartRoutes);

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error('Database connection failed!', error);
        process.exit();
    });

