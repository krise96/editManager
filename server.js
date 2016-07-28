var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose.js');
var methodOverride = require('method-override');

var app = express();
var router = express.Router();
var server = app.listen(1337);

app.use(bodyParser.json())
app.use(router);
app.use(express.static(path.join(__dirname, "public"))); 
app.use(methodOverride());

app.get('/peoples', function(req, res) {
    console.log('GET method');
    return mongoose.PeopleModel.find(function (err, peoples) {
        if (!err) {
            return res.send(peoples);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

// app.delete('/peoples', function (req, res){
//     console.log("Delete method");
//     console.log(req.body);
//     try{
//     mongoose.PeopleModel.findOne({author: req.body.author, text: req.body.text}).remove().exec();
//     }catch(e){
//         return res.send({ status: 'Bad request'});
//     }
//     return res.send({ status: 'OK'});
// });

app.post('/peoples', function(req, res) {
    console.log('---------------------------------------------', req.body.lastName);
    
    var people = new mongoose.PeopleModel({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email
    });
    
    
    console.log(people);
    people.save(function (err) {
        if (!err) {
            console.log("People added");
            return mongoose.PeopleModel.find(function (err, peoples) {
        if (!err) {
            return res.send(peoples);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            console.log('Internal error(%d): %s',res.statusCode,err.people);
        }
    });
});







