const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const legoData = require("./modules/legoSets");

app.use(express.static('public'));

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
    res.send("Lego Set");
});

app.get("/lego/sets", (req, res) => {
    legoData.getAllSets()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(`Error: ${err.message}`)); // Handle errors
});

app.get("/lego/sets/num-demo", (req, res) => {
    legoData.getSetByNum("10311-1")
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).send("Set Not found");
            }
        })
        .catch(err => res.status(500).send(`Error: ${err.message}`)); // Handle errors
});

app.get("/lego/sets/theme-demo", (req, res) => {
    legoData.getSetsByTheme("tech")
        .then(data => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(404).send("No sets found with this theme");
            }
        })
        .catch(err => res.status(500).send(`Error: ${err.message}`)); // Handle errors
});
