var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');
var User = require('./models/user');
var Customer = require('./models/customer');
var Restaurant = require('./models/restaurant');

var app = express();
var PORT = 3131;

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*----------------------USER SAMPLE --------------------------*/
app.post('/user',function(req,res){
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Success"});
    });
});

app.post('/user/saveUser',function(req,res){
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Success"});
    });
});

app.get('/user/viewUsers', function(req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
        } else {
            console.log("View users success");
            res.json(users);
            res.end();
        }
    })
});

//Delete Users
app.delete('/user/deleteUser/:id', function(req, res) {
    User.remove({name:req.params.id}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({"Status" : "Successfully deleted!"});
        }
    })
});

//Updating Users

app.put('/user/updateUser/:id',function(req,res){
    User.findById(req.params.id, function(err,user){
        if(err) throw err;
        user.name = req.body.name;
        user.email = req.body.email;

        user.save(function(err){
            if(err) throw err;
            res.json({"Status" : "User updated"});
        })
    })
});

/*----------------------CUSTOMER ----------------------*/
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

//Home Screen for viewing all restaurants

app.get('/customer/home', function(req, res) {
    Customer.find({}, function (err, restaurants) {
        if (err) {
            console.log(err)
        } else {
            console.log(restaurants);
            res.json(restaurants);
            res.end();
        }
    })
});

//On selecting restaurant :restaurantId is used to find the required restaurant

app.get('/customer/restaurantDetails:restaurantId', function(req, res) {
    Restaurant.find({restaurantId : req.params.restaurantId}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })

});


/*--------------------------- END OF CUSTOMER-----------------------------------*/

/*---------------------- ENTERING RESTAURANTS  --------------------------------*/

app.post('/customer/restaurantDataTest',function(req,res){
    var restaurant = new restaurant();

    restaurant.restaurantId = req.body.restaurantId;
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.restaurantEmail = req.body.restaurantEmail;
    restaurant.restaurantPhoneNumber = req.body.restaurantPhoneNumber;
    restaurant.restaurantAddress = req.body.restaurantAddress;
    restaurant.restaurantGeoLocation = req.body.restaurantGeoLocation;

    restaurant.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Restaurant Saved"});
    });
});

/*---------------------END OF ENTERING RESTAURANTS------------------------------*/


app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});