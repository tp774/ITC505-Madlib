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
    res.sendFile(path.join(__dirname, 'index.html'));
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
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f9;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                        color: #333;
                    }
                    .error-container {
                        background: #fff;
                        border-radius: 8px;
                        padding: 2rem;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #d9534f;
                    }
                    a {
                        display: inline-block;
                        background-color: #0275d8;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        margin-top: 1rem;
                        font-weight: bold;
                    }
                    a:hover {
                        background-color: #025aa5;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
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
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f8ff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    text-align: center;
                    color: #333;
                }
                .story-container {
                    background: #fff;
                    border-radius: 8px;
                    padding: 2rem;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                }
                h1 {
                    color: #0275d8;
                }
                .story-text {
                    line-height: 1.8;
                    margin-top: 1rem;
                }
                strong {
                    color: #d9534f;
                }
                a {
                    display: inline-block;
                    background-color: #0275d8;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 1rem;
                    font-weight: bold;
                }
                a:hover {
                    background-color: #025aa5;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>🏴‍☠️ Your Pirate Adventure Awaits!</h1>
                <div class="story-text">
                    <p>
                        Captain of the mighty <strong>${pirateShip}</strong>, you sail the seven seas in search of the most
                        coveted treasure: the <strong>${treasureItem}</strong>! 
                        As you <strong>${actionVerb}</strong> across the waves, the sea <strong>${seaAdverb}</strong>
                        crashes against the sides of your ship.
                    </p>
                    <p>
                        Soon, you spot a hidden island, <strong>${hiddenIsland}</strong>, where the treasure is said to lie.
                    </p>
                    <a href="/ITC505/Lab-7/index.html">Go on another adventure!</a>
                </div>
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
