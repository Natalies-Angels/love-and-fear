const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve data.txt directly via a GET request
app.get('/data.txt', (req, res) => {
    const filePath = path.join(__dirname, 'data.txt');
    res.sendFile(filePath);
});

// Serve networkingBingoData.txt directly via a GET request
app.get('/networkingBingoData.txt', (req, res) => {
    const filePath = path.join(__dirname, 'networkingBingoData.txt');
    res.sendFile(filePath);
});

// Handle form data for perpScreeningData.txt
app.post('/perpSubmit', async (req, res, next) => {
    try {
        const data = JSON.stringify(req.body, null, 2);
        const filePath = path.join(__dirname, 'perpScreeningData.txt');
        await fs.appendFile(filePath, `${data}\n`);
        res.redirect('/perpScreening.html');
    } catch (err) {
        console.error('Error writing to perpScreeningData.txt:', err);
        next(err);
    }
});

// Handle form data for data.txt
app.post('/submit', async (req, res, next) => {
    try {
        const data = JSON.stringify(req.body, null, 2);
        const filePath = path.join(__dirname, 'data.txt');
        await fs.appendFile(filePath, `${data}\n`);
        res.redirect('/index.html#wrapper');
    } catch (err) {
        console.error('Error writing to data.txt:', err);
        next(err);
    }
});

// Handle form data for networkingBingoData.txt
app.post('/submitBingoData', async (req, res, next) => {
    try {
        const data = JSON.stringify(req.body, null, 2);
        const filePath = path.join(__dirname, 'networkingBingoData.txt');
        await fs.appendFile(filePath, `${data}\n`);
        res.redirect('/networkingBingo.html');
    } catch (err) {
        console.error('Error writing to networkingBingoData.txt:', err);
        next(err);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
