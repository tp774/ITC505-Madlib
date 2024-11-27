const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware to handle form data
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files (images, CSS, etc.)
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath)); // Serve the entire 'public' directory

// Route to serve the form page directly
server.get('/pirate-adventure', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Mad Lib route handler for form submission
server.post('/pirate-adventure', (req, res) => {
    const { pirateShip, treasureItem, actionVerb, seaAdverb, hiddenIsland } = req.body;

    if (!pirateShip || !treasureItem || !actionVerb || !seaAdverb || !hiddenIsland) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Pirate Quest Error</title>
                <style>
                    /* Add internal styles here */
                </style>
            </head>
            <body>
                <div>
                    <h1>🏴‍☠️ Quest Incomplete!</h1>
                    <p>Please fill out ALL pirate adventure details!</p>
                    <a href="/pirate-adventure">Return to Pirate Ship</a>
                </div>
            </body>
            </html>
        `);
        return;
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Your Pirate Adventure</title>
            <style>
                /* Add internal styles here */
            </style>
        </head>
        <body>
            <div>
                <h1>🏴‍☠️ Your Pirate Adventure Awaits!</h1>
                <p>
                    Captain of the mighty <strong>${pirateShip}</strong>, you sail the seven seas in search of the most
                    coveted treasure: the <strong>${treasureItem}</strong>! 
                    As you <strong>${actionVerb}</strong> across the waves, the sea <strong>${seaAdverb}</strong>
                    crashes against the sides of your ship.
                </p>
                <p>
                    Soon, you spot a hidden island, <strong>${hiddenIsland}</strong>, where the treasure is said to lie.
                </p>
                <a href="/pirate-adventure">Go on another adventure!</a>
            </div>
        </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
