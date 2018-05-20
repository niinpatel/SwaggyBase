var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');
var User = require('./models/user');
var Customer = require('./models/customer');
var Restaurant = require('./models/restaurant');


var app = express();
var PORT = 3132;

//Middleware

app.use(bodyParser.json())
var customerRoutes = require('./routes/customerRoutes')
app.use("/customer", customerRoutes);

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



app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});