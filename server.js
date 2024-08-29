const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submissions
app.post('/submit', (req, res) => {
    const formData = req.body;
    const dataToAppend = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    // Append the data to a file
    fs.appendFile('data.txt', dataToAppend + '\n', (err) => {
        if (err) throw err;
        console.log('Data was appended to file!');
        res.redirect('/');
    });
});

// Serve data.txt file
app.get('/data.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.txt'));
});

app.post('/perp-submit', (req, res) => {
    const formData = req.body;

    // Format the data to append to the file
    const dataToAppend = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    // Path to the file
    const filePath = path.join(__dirname, 'perpScreeningData.txt');

    // Append the data to the file
    fs.appendFile(filePath, dataToAppend + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving data.');
            return;
        }
        console.log('Data was appended to file!');
        res.send('Form submitted and data saved successfully!');
    });
});


// Basic route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

