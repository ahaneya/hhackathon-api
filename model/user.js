var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var user = new schema({
    user_id: {type: Number, required: true , index: true, unique: true},
    user_first_name: {type: String, required: true},
    user_last_name: {type: String, required: true},
    country: {type: String, required: true},
    mobile: Number,
    NumberOfHajaj: Number,
    Role: Number ,
    // Role 1 for Haj 
    //Role 2 for mfoj
    // Role 3 for head
    Hamlh_id:  [{type: ObjectId, ref: 'Hamlh'}]
   
})


module.exports = mongoose.model('User', user);