var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');


var app = express();
var PORT = 3132;

//Middleware

app.use(bodyParser.json())
var customerRoutes = require('./routes/customerRoutes');
app.use("/customer", customerRoutes);

app.use(bodyParser.urlencoded({extended:true}));



app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});