var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/peoples');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err);
});

db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;


var People = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }
});


var PeopleModel = mongoose.model('People', People);
module.exports.PeopleModel = PeopleModel;
