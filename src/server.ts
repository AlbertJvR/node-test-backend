import express from 'express';

const app = express();

const port = 3030;

app.get('/', (req, res) => {
    res.send('Hello dark little world...');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});