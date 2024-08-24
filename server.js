const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

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
        res.send('Data submitted successfully');
    });
});

// Basic route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
