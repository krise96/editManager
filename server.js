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

app.delete('/peoples', function(req, res){
    mongoose.PeopleModel.findById(req.body.id, function(err, people) {
        if (!people)
            return next(new Error('Could not load Document'));
        else {
            people.remove(function(err) {
                if (err){
                    console.log('error');
                }else
                    console.log('success');
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
        }
    });
});

app.put('/peoples', function(req, res){
    mongoose.PeopleModel.findById(req.body.id, function(err, people) {
        if (!people)
            return next(new Error('Could not load Document'));
        else {
            people.firstName = req.body.firstName;
            people.lastName = req.body.lastName;
            people.email = req.body.email;
            people.save(function(err) {
                if (err){
                    console.log('error');
                }else
                    console.log('success');
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
        }
    });
});
app.post('/peoples', function(req, res) {
    console.log('---------------------------------------------');
    
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







