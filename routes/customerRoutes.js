var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var Restaurant = require('../models/restaurant');


router.post('/register',function(req,res){
    var customer = new Customer();

    customer.customerId = req.body.customerId;
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

router.get('/home', function(req, res) {
    Restaurant.find({}, function (err, restaurants) {
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

router.get('/restaurantDetails/:restaurantId', function(req, res) {
    Restaurant.find({restaurantId : req.params.restaurantId}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })

});

// TEST FOR DATA RESTAURANT DATA

router.post('/restaurantDataTest',function(req,res){
    var restaurant = new Restaurant();

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


module.exports = router;