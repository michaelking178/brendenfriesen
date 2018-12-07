var express = require("express");

var app = express();
app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    res.render("index");
});

// Port listening
app.listen(3000, function(){
    console.log("Server running...");
});