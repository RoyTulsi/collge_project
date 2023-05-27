const mongoose = require('mongoose');


const BookingRequest = new mongoose.Schema({
    

    ename: {
        required: true,
        type: String
    },
        name: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    
    budget: {
        required: true,
        type: Number
    },
    guest: {
        required: true,
        type: Number
    },

})

module.exports = mongoose.model('BookingRequest', BookingRequest);