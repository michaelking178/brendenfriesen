const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
    res.render("contact", {msg:""});
});

app.post("/send", function(req, res){
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Organization: ${req.body.organization}</li>
        </ul>
        <h3>Message:</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "apikey", // generated ethereal user
            pass: "" // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Brenden Friesen Official Website" <michael.ac.king@outlook.com>', // sender address
        to: 'mack178@hotmail.com', // list of receivers
        subject: 'New Contact Form Message', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render("contact", {msg: "Email has been sent."});
    });
});

// Port listening
let port = process.env.PORT;
if (port == null || port == ""){
    port = 8000;
}
app.listen(port);