const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle form data for perpScreeningData.txt
app.post('/submitPerpScreeningData', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.appendFile('perpScreeningData.txt', `${data}\n`, (err) => {
        if (err) {
            console.error('Error writing to perpScreeningData.txt:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('/perpScreening.html');
    });
});

// Handle form data for data.txt
app.post('/submitData', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.appendFile('data.txt', `${data}\n`, (err) => {
        if (err) {
            console.error('Error writing to data.txt:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('/');
    });
});

// Handle form data for networkingBingoData.txt
app.post('/submitBingoData', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.appendFile('networkingBingoData.txt', `${data}\n`, (err) => {
        if (err) {
            console.error('Error writing to networkingBingoData.txt:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('/networkingBingo.html');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
