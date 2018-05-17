var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');
var User = require('./models/user');
var Customer = require('./models/customer');

var app = express();
const PORT = 3131;

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/user',function(req,res){
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Success"});
    });
});

app.post('/customer/register',function(req,res){
    var customer = new Customer();

    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.email = req.body.email;
    customer.phoneNumber = req.body.phoneNumber;
    customer.password = req.body.password;
    customer.confirmPassword = req.body.confirmPassword;
    customer.address = req.body.address;

    customer.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Customer Saved"});
    });
});

app.get('/customer/home', function(req, res) {


    Customer.find({}, function (err, data) {

        if (err) {
            console.log(err)
        } else {
            console.log(data);
            res.end();
        }
    })
});

app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});