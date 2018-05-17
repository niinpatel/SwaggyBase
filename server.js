var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');
var User = require('./models/user');

var app = express();
const PORT = 3131;

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/',function(req,res){
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Success"});
    });
});


app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});