var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var haj = new schema({
    haj_id: {type: Number, required: true , index: true, unique: true},
    haj_first_name: {type: String, required: true},
    haj_last_name: {type: String, required: true},
    country: {type: String, required: true},
    mobile: Number,
    location_lng: String,
    location_lat: String,
    lost: Boolean,
    rel_haj_id: Number,
    Superuser_id: [{type: ObjectId, ref: 'User'}],
    updated_by: [{type: ObjectId, ref: 'User'}],
    updated_dttm: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Haj', haj);