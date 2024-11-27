const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev')) 

server.get('/do_a_random', (req, res) => {
  res.send(`Your magical number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib route handler with styled response
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { magicalCreature, enchantedObject, heroAction, mysteriousAdverb, legendaryLocation } = req.body;
    
    // Check if all fields are filled
    if (!magicalCreature || !enchantedObject || !heroAction || !mysteriousAdverb || !legendaryLocation) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>Magical Quest Error</title>
                <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Merriweather', serif;
                        background-image: url('https://ideogram.ai/assets/image/lossless/response/medieval-fantasy-landscape');
                        background-size: cover;
                        background-position: center;
                        background-attachment: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                        color: #2c3e50;
                    }
                    .error-container {
                        background: rgba(255,255,255,0.9);
                        border-radius: 15px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                        padding: 2rem;
                        max-width: 500px;
                    }
                    h1 { color: #8b4513; }
                    a {
                        display: inline-block;
                        background-color: #8b4513;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        margin-top: 1rem;
                        transition: background-color 0.3s ease;
                    }
                    a:hover {
                        background-color: #5d3000;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>🔮 Quest Incomplete!</h1>
                    <p>Please fill out ALL magical quest details!</p>
                    <a href="/ITC505/lab-7/index.html">Return to Realm</a>
                </div>
            </body>
            </html>
        `);
        return;
    }
    
    // Create the styled mad lib story response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Your Mystical Quest</title>
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Merriweather', serif;
                    background-image: url('https://ideogram.ai/assets/image/lossless/response/medieval-fantasy-landscape');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 1rem;
                    color: #2c3e50;
                }
                .story-container {
                    background: rgba(255,255,255,0.9);
                    border-radius: 15px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    padding: 2rem;
                    max-width: 600px;
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                h1 {
                    color: #8b4513;
                    margin-bottom: 1rem;
                }
                .story-text {
                    line-height: 1.6;
                }
                .highlighted {
                    color: #8b4513;
                    font-weight: bold;
                }
                .action-link {
                    display: inline-block;
                    background-color: #8b4513;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    margin-top: 1rem;
                    transition: background-color 0.3s ease;
                }
                .action-link:hover {
                    background-color: #5d3000;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>🏰 Your Legendary Quest Revealed!</h1>
                <div class="story-text">
                    <p>
                        In the ancient realm of <span class="highlighted">${legendaryLocation}</span>, a fellowship of 
                        <span class="highlighted">${magicalCreature}</span> embarked on a perilous journey. Armed with a mystical 
                        <span class="highlighted">${enchantedObject}</span>, they vowed to 
                        <span class="highlighted">${heroAction}</span> 
                        <span class="highlighted">${mysteriousAdverb}</span>. 
                        Little did they know that their quest would become a legend whispered through generations!
                    </p>
                </div>
                <a href="/ITC505/lab-7/index.html" class="action-link">Begin Another Mystical Journey 🧙‍♂️</a>
            </div>
        </body>
        </html>
    `);
});

const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

let port = 80
if (process.argv[2] === 'local') {
    port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))