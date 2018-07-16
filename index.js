var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var objectid= require('mongodb').ObjectId ;

var bodyParser = require("body-parser");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var cors = require("cors");






var url = "mongodb://localhost:27017/Resource";


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports.connect=(url,callback)=>{ MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    console.log("connected");
    callback(err,db)

})}
module.exports.find = (db,database,collections) =>{
var  dbo = db.db(database);
dbo.collection(collections).find({}).toArray(
    function(err,result){
        if (err)
        throw err;
        console.log(result)
        //res.json({err: false, result: result});


    }
)


}

module.exports.insert = (db,database,collections,data) =>{
    var  dbo = db.db(database);
     
    

    dbo.collection(collections).insertOne(data, function (err, result) {
        if (err) throw err;
        console.log(result)
        // res.json({err: false, result: result});
    


})
}

module.exports.update = (db,database,collections,id,data) =>{
    var  dbo = db.db(database);

    dbo.collection(collections).updateOne({_id :new objectid(id) },{$set:{
        data
        
       
    }}, function (err, result) {
        if (err) throw err;
        console.log(result)

        // res.json({err: false, result: result});
    


})

}

module.exports.delete = (db,database,collections,id) =>{
    var  dbo = db.db(database);
    
    dbo.collection(collections).deleteOne({_id :new objectid(id) }, function (err, result) {
        if (err) throw err;
        console.log(result)
        // res.json({err: false, result: result});
    


})

}


// })
