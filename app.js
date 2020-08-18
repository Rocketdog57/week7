var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'users',
  password : '1Million123'
});

app.get("/", function(req, res){
    // Find email in DB
    var q = "SELECT Email AS emails FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        var email= results[0].Email; 
        res.render("home", {emails: Email});
    });
});

app.post("/register", function(req, res){
    var email = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', email, function(err, result) {
        if (err) throw err;
        res.redirect("/");
     });
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
});
