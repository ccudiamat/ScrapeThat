var express = require("express");
var expressHandlebars = require("express-handlebars")
var mongoose = require("mongoose");
// var axios = require("axios");
// var cheerio = require("cheerio");
// var db = require("./models");

var PORT = 3000;
var app = express();
var router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

require("./config/routes.js")(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function (error) {
    if (error) {
        console.log("error");
    }
    else {
        console.log("success");
    }
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });