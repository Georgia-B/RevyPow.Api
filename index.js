var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var router = require("./src/routes");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10kb" }));
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}));

app.use(router);


app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port: " + process.env.PORT);
});