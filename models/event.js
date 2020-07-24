const mongoose = require('mongoose');

//Schema is the building block in mongoose
const Schema = mongoose.Schema;

//constructor and we set up the event object data structure
const eventSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    //one creator for every event
    creator : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

//mongoose.model(databaseName, pointerToSchema)
module.exports = mongoose.model('Event', eventSchema);