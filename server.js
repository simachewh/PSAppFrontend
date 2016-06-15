var express = require("express");
var app = express();
var path = require("path");

// Handling CORS (cross-origin resource sharing) requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');
    next();
});

// Set the public folder to serve public assets.
app.use(express.static(__dirname + "/"));

// Set the one route to the index.html file.
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"))
});

// Start the server on port 8080 (http://localhost:8080)
var litsner = app.listen(1985);
require("util").log("Starting server at " + litsner.address().port);
