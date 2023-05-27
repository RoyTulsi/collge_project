const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

     ename:String,
     edate:String,
     evenue:String,
     discp:String,
     img:String

})

module.exports = mongoose.model('Event', EventSchema);