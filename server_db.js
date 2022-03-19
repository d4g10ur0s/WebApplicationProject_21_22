var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var http = require('http');
var util = require('util');
var mysql = require('mysql');
const url = require('url');
var formidable = require('formidable');

var haversine = require("haversine-distance");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
//app.use(express.json());
//vazw pou eimai
app.all('/login',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM user WHERE username like \'"+mdata.username+"\' AND email like \'"+mdata.email+"\';";
          con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            if(result.length == 0){
              message = {info : "Invalid Username or E-Mail"};
              res.write(JSON.stringify(message));
              res.end();
            }else{
              var mquery = "UPDATE user SET lat="+mdata.coords.lat+",lon="+mdata.coords.lon+",online=1 WHERE username like \'%"+mdata.username+"%\' AND email like \'%"+mdata.email+"%\';";
              message = {info : '1',points : result[0].points};
              res.write(JSON.stringify(message));
              res.end();
            }
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});
//gia login
//gia register
app.all('/register',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM user WHERE username like \'%"+mdata.username+"%\' AND email like \'%"+mdata.email+"%\';";
          con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            if(result.length > 0){
              message = {info : "User Exists"};
              res.write(JSON.stringify(message));
              res.end();
            }else{
              res.write(JSON.stringify({info : '1'}));
              res.end();
              var mquery = "INSERT INTO user(username,email,pssw,points) VALUES (\'"+mdata.username+"\' ,\'"+mdata.email+"\',\'"+ mdata.password+"\',1000);";
              query(mquery);
            }
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

//gia location creation
app.all('/location_creation',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM location WHERE name like \'%"+mdata.name+"%\' AND lat = "+mdata.coords.lat+" AND lon = "+mdata.coords.lon+";"
          con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            if(result.length > 0){
              message = {info : "Location Exists"};
              res.write(JSON.stringify(message));
              res.end();
            }else{
              res.write(JSON.stringify({info : '1'}));
              res.end();
              if (mdata.private){
                mdata.private = 1
              }else{mdata.private = 0}
              var mquery = "INSERT INTO location(name,lat,lon,private,creator) VALUES (\'"+mdata.name+"\' ,"+mdata.coords.lat+","+ mdata.coords.lon+","+mdata.private+",\'"+ mdata.creator+"\');";
              query(mquery);
            }
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

//gia event creation
app.all('/event_creation',async function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end",async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(async function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM event WHERE name like \'%"+mdata.name+"%\' AND creator like \'"+mdata.creator+"\' AND lname like \'"+mdata.lname+"\';"
          con.query(mquery,async function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            if(result.length > 0){
              message = {info : "Event Exists"};
              res.write(JSON.stringify(message));
              res.end();
            }else{
              var mquery = "SELECT * FROM location WHERE name like \'%"+mdata.lname+"%\';"
              result = await query(mquery);
              console.log(result);
              if(result.length > 0){
                res.write(JSON.stringify({info : '1'}));
                res.end();
                if (mdata.private){
                  mdata.private = 1
                }else{mdata.private = 0}
                var mquery = "INSERT INTO event(name,lname,p_earned,p_loose,capacity,creator) VALUES (\'"+mdata.name+"\' ,\'"+mdata.lname+"\',"+ mdata.pearned+","+mdata.ploose+","+mdata.capacity+",\'"+ mdata.creator+"\');";
                query(mquery);
              }else{
                let send = "Np location named " + mdata.lname;
                res.write(JSON.stringify({info : send}));
                res.end();
              }
            }
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

//gia location near
app.all('/get_locations_near',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });

        con.connect(async function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM location WHERE creator like \'%"+mdata.username+"%\' OR private=0;";
          var mres = await query(mquery);
          var point1 = {lat : mdata.coords.lat,lng : mdata.coords.lon};
          async function help_me_god(mres,point1){
            var to_ret = [];
            for(i in mres){
              var point2 = {lat : mres[i].lat , lng : mres[i].lon};//pairnw to 2o point
              var haversine_m = haversine(point1, point2); //metraw apostash
              console.log(haversine_m);
              //var haversine_km = haversine_m /1000; //Results in kilometers
              if(haversine_m/1000 <= 100){
                to_ret.push(mres[i]);
              }
            }//sto to_ret mono oti einai se apostash 20 metrwn
            return to_ret;
          }
          var to_ret = await help_me_god(mres,point1);
          console.log("edw");
          await res.write(JSON.stringify(to_ret));
          await res.end();
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

app.all('/simple_search',async function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end",async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;
        console.log(mdata);
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(async function(err) {
          console.log("Connected");
          //const query = util.promisify(con.query).bind(con);//g9ia na exw promises
          var mquery = "SELECT * FROM user WHERE username like \'"+mdata.name+"%\';"
          con.query(mquery,async function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            message = {info : result};
            res.write(JSON.stringify(message));
            res.end();
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

//gia friend request
app.all('/send_friend_request',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        mdata = mdata.msg;                                  //prosexe to ligo ayto...
        console.log(mdata);
        var con = mysql.createConnection({//sundesh se vash
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "mapp",
          multipleStatements: true
        });
        con.connect(function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//gia na exw promises
          //den kserw an 8a xreiastei security...
          // ? var mquery = "SELECT * FROM location WHERE name like \'%"+mdata.name+"%\' AND lat = "+mdata.coords.lat+" AND lon = "+mdata.coords.lon+";"
          var mquery = "INSERT INTO friend_request(username_1,username_2) VALUES (\'"+mdata.username1+"\' ,\'"+mdata.username2+"\'),(\'"+mdata.username2+"\' ,\'"+mdata.username1+"\');";
          con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            res.write(JSON.stringify({info : '1'}));
            res.end();
          });//telos query gia info
        });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
    });//req on end
  }//end if
});

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

app.listen(8080, function() {
console.log('Node app is running on port 8080');
});
module.exports = app;
