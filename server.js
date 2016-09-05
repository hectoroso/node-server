var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log("private route hit");
        next();
    },
    logger: function(req, res, next) {
        console.log('Request: ' + (new Date().toString()) + ' ' + req.method + ' ' + req.originalUrl);
        next();
    }
}

// application-level middleware must be specified before routes
app.use(middleware.logger)

// app.get('/', function(req, res) {
//     res.send('Hello express');
// });

app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About Us');
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, function() {
    console.log("express server started on port " + PORT);
});