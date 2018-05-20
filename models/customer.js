var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customerId: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    address: { type: String, required: true },

});

module.exports = mongoose.model('Customer',customerSchema);