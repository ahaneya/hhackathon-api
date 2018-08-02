var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var haj = require('../model/haj');



var app = express();
var db = mongoose.connect("mongodb://localhost:27017/driftersDB", {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// ########### CRUD START #################

app.post('/NewHaj', function(req,res){
    var haj_info = {
        haj_id : req.body.haj_id,
        haj_first_name : req.body.haj_first_name,
        haj_last_name : req.body.haj_last_name,
        country : req.body.country,
        mobile : req.body.mobile,
        lost : req.body.lost,
        rel_haj_id : req.body.rel_haj_id,
        // superuser_id : req.body.superuser_id
    } 

    haj.create(haj_info, function(err,savedInfo){
        if(err) {
            res.status(500).send("Something went wrong")
        } else {
            res.status(200).send(savedInfo);
        }
    })
})

app.get('/queryById/haj_id=:hajId', function(req,res){

    if (!req.params.hajId) {
        res.status(500).send("Please enter Haj ID")
    } else {
        haj.find({haj_id: req.params.hajId}, function(err, data){
            if (err) {
                res.status(500).send("Not Found")
                console.log(req.params.hajId);
            } else{
                res.status(200).send(data);
            }
        })
    }
})

app.put('/confirm/submission/', function(req,res) {
    inData ={
        haj_id: req.body.haj_id,
        lost: req.body.lost,
        lat: req.body.lat,
        lng: req.body.lng,
        update_dttm: req.body.update_dttm,
        updated_by: req.body.updated_by
    }
    if(!inData) {
        res.status(500).send("Please enter some data");
    } else {
        haj.findOneAndUpdate({haj_id: inData.haj_id}, {lat: inData.lat, lng: inData.lng, updated_by: inData.update_dttm}, function(err, updatedDoc){
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(updatedDoc)
            }
        })
    }
})

// ###########  CRUD END #################
app.listen(3000, function() {
    console.log("Node Js server is running");
})