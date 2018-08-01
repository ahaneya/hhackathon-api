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
    var haj_id_query = req.params.hajId;
    if (!haj_id_query) {
        res.status(500).send("Please enter Haj ID")
    } else {
        haj.find({haj_id: req.params.hajId}, function(err, data){
            if (err) {
                res.status(500).send("Not Found")
                console.log(haj_id_query);
            } else{
                res.status(200).send(data);
            }
        })
    }
})

// ###########  CRUD END #################
app.listen(3000, function() {
    console.log("Node Js server is running");
})