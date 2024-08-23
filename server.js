const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080; 

const legoData = require("./modules/legoSets");

legoData.initialize().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to initialize Lego data:", err);
})
