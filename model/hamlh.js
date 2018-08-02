var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var hamlh = new schema({
    Hamlh_id: {type: Number, required: true , index: true, unique: true},
    Hamlh_name: {type: String, required: true},
    mobile1: {type:Number, required: true },
    mobile2: Number,
    mobile3: Number,
    NumberOfHajaj: Number,
    NumberOfSuperuser: number ,
    Website: String,
    location_long: String,
    location_latt: String,
})

module.exports = mongoose.model('Hamlh', hamlh);