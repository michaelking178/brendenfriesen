var express = require("express");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("resources"));

// Routes
app.get("/", function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    res.render("index");
});

app.get("/bio", function(req, res){
    res.render("bio");
});

app.get("/calendar", function(req, res){
    res.render("calendar");
});

app.get("/press", function(req, res){
    res.render("press");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

// Port listening
let port = process.env.PORT;
if (port == null || port == ""){
    port = 8000;
}
app.listen(port);