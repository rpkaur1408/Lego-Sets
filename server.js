const express = require('express');
const legoData = require('./modules/legoSets');
const path = require('path');

// Initialize Express app
const app = express();
app.use(express.static(__dirname + '/public'));  
const PORT = 8080;

// Initialize the Lego data before starting the server
legoData.initialize()
    .then(() => {
        // Start the server only after initialization is complete
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error(`Failed to initialize Lego data: ${error}`);
    });

// Middleware to parse JSON bodies (if needed in the future)
app.use(express.json());

// GET "/"
// This route sends back the home.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// GET "/about"
// This route sends back the about.html file
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// GET "/lego/sets"
// This route responds with Lego sets, filtered by theme if the query parameter is present
app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => res.json(sets))
            .catch(error => res.status(404).send(error.message));
    } else {
        legoData.getAllSets()
            .then(sets => res.json(sets))
            .catch(error => res.status(404).send(error.message));
    }
});

// GET "/lego/sets/:set_num"
// This route responds with the Lego set that matches the set_num
app.get('/lego/sets/:set_num', (req, res) => {
    const setNum = req.params.set_num;
    legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => res.status(404).send(error.message));
});

// Custom 404 Error Page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Required for vercel 
module.exports = app