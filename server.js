const path = require('path');

const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const legoData = require("./modules/legoSets");


app.use(express.static(__dirname + '/public'));
// Running Port
legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {  // Changed PORT to HTTP_PORT
        console.log(`Server is running on port ${HTTP_PORT}`);
    });
}).catch(err => {
    console.error("Failed to initialize Lego data:", err);
});

// Defining Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'views','home.html'));
});

// GET "/about"
// This route sends back the about.html file
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


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

//For Vercel
module.exports = app;