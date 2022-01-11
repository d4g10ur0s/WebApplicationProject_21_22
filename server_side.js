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

var app = express();

var haversine = require("haversine-distance");

//Gia na pairnw ti mera einai
function td(){
  switch (new Date().getDay()) {
  case 0:
    return "Sunday";
  case 1:
    return "Monday";
  case 2:
     return "Tuesday";
  case 3:
    return "Wednesday";
  case 4:
    return "Thursday";
  case 5:
    return "Friday";
  case 6:
    return "Saturday";
}
}

// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
//app.use(express.json());

app.use(cors({
    credentials: true,
    preflightContinue: true,
    methods: "GET, POST, PUT, PATCH , DELETE, OPTIONS",
    origin: true
}));


app.all('/adminload',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      const body = [];
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        //dhmiourgia connection me vash
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "projectweb",
          multipleStatements: true
        });
        //shndesh me vash
        con.connect(function(err) {
          console.log("Connected");
          var busert = [];         //vazw ta panta mesa se lista
          //dict gia days
          var mdayz = {};
          //lista gia types
          var mtypes = {};
          for(k in mdata){
            //gia na vazw hmeres
            for(j in mdata[k].populartimes){
              if( !(mdata[k].populartimes[j].name in mdayz)){
                //console.log(mdata[0]);
                mdayz[mdata[k].populartimes[j].name]=[];
                mdayz[mdata[k].populartimes[j].name].push([mdata[k].id].concat(mdata[k].populartimes[j].data));
              }//an den einai valto
              else{
                mdayz[mdata[k].populartimes[j].name].push([mdata[k].id].concat(mdata[k].populartimes[j].data));
              }
            }//end for populartimes
            //prepei na parw ta types
            for(type in mdata[k].types){
              if( mdata[k].types[type] == "point_of_interest" ){
                continue;//ayto to table yparxei hdh ke einai axriasto ws type
              }
              if( !(mdata[k].types[type] in mtypes)){
                //console.log(mdata[0]);
                mtypes[mdata[k].types[type]]=[];
                mtypes[mdata[k].types[type]].push([mdata[k].id]);
              }//an den einai valto
              else{
                mtypes[mdata[k].types[type]].push([mdata[k].id]);
              }
            }
            console.log(mdata[k].name);
            busert.push([mdata[k].id,mdata[k].name,mdata[k].address,mdata[k].coordinates.lat,mdata[k].coordinates.lng,mdata[k].rating,mdata[k].rating_n]);
          }//end for proetoimasias
          console.log(mdayz["Monday"]);

          //vazw point of interest info (id name address lat lon rating rating_n)
          //mdata[...]...
          var mquery = "INSERT INTO point_of_interest(id,name,address,lat,lon,rating,rating_n) VALUES ?";
          con.query(mquery,[busert], function (err, result, fields) {
            if (err){
              throw err;
            }
          });//telos query gia info
          //vazw ka8e eidos
          for(tp in mtypes){
            con.query("create table if not exists "+tp+"(pointid varchar(30));", function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query_1
            //vazw to sxetiko id
            var tload = mtypes[tp];
            var mquery = "INSERT INTO "+tp+"(pointid) VALUES ?";
            con.query(mquery,[tload] ,function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query_2
          }//endfor
          // vazw ka8e eidos
          //vazw se hmeres
          for(d in mdayz){
            console.log(d);
            var mquery = "INSERT INTO "+d+"(id,i,ii,iii,iv,v,vi,vii,viii,ix,x,xi,xii,xiii,xiv,xv,xvi,xvii,xviii,xix,xx,xxi,xxii,xxiii,xxiv) VALUES ?";
            con.query(mquery,[mdayz[d]], function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query gia mia hmera
          }//vazw hmeres
        });//telos connect
        res.end();//telos sundeshs
      });
    }
});

app.post('/usrpointers',function (req, res) {
  var body = [];
  //diavazw data
  req.on("data", (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });
  //otan exeis diavasei olo to data
  req.on("end", () => {

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });

    console.log(req.url);
    var info = Buffer.concat(body).toString();
    info = JSON.parse(info);//parsing json
    info = info.message;
    info = info.split(' ');
    console.log(info.message);
    //lets query db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Den8aKsexasw",
      database: "projectweb",
      multipleStatements: true
    });
    if(!(info=="")){
      con.connect(function(err) {
        console.log("Connected");
        console.log(info[0]);
        console.log(td());
        var mquery = "select point_of_interest.name,t2.*,point_of_interest.address,point_of_interest.lon,point_of_interest.lat,point_of_interest.rating,point_of_interest.rating_n from point_of_interest inner join ((select (pointid) from "+ info[0]+") as t1 inner join (select * from "+td()+") as t2 on t2.id=t1.pointid )on t1.pointid=point_of_interest.id";
        con.query(mquery, function (err, result, fields) {
          if (err){
            throw err;
          }
          console.log(result);
          res.write(JSON.stringify(result));
          res.end();
        });//telos query gia info
      });//telos connect
    }//an to info einai tpt mhn kanei tpt

    res.on('error', (err) => {
      console.error(err);
    });
  });

  });

  //gia na vazei o user location
  app.all('/userloc',function (req, res) {
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
          mdata = mdata.mssg;
          console.log(mdata);
          //dhmiourgia connection me vash
          var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Den8aKsexasw",
            database: "projectweb",
            multipleStatements: true
          });
          //shndesh me vash
          con.connect(function(err) {
            console.log("Connected");
            //vazw se poio shmeio eimai lon ke lat
            var mquery = "UPDATE user SET lat="+mdata[1]+",lon="+mdata[2]+" WHERE username like \'%"+mdata[0]+"%\'";
            con.query(mquery, function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query gia lon ke lat
            //eimai se shmeia endiaferontos?
            mquery = "SELECT name,lat,lon FROM point_of_interest ;";
            con.query(mquery, function (err, result, fields) {
              if (err){
                throw err;
              }
              var to_ret = [];
              var point1 = {lat : 38.2496651 ,lng : 21.7390541};
              for(i in result){
                var point2 = {lat : result[i].lat , lng : result[i].lon};//pairnw to 2o point
                var haversine_m = haversine(point1, point2); //metraw apostash
                //var haversine_km = haversine_m /1000; //Results in kilometers
                if(haversine_m < 20){
                  console.log("sunevh");
                  to_ret.push(result[i]);
                }
              }
              to_ret = {tret : to_ret};
              res.write(JSON.stringify(to_ret));//grafw result sto telos
              res.end();//end of response
            });//telos query gia lon ke lat
          });//telos connect
        });//req on end
      }//end if
    });//gia na vazei o user location

    //gia na vazei o user krousma
    app.all('/userkrousma',function (req, res) {
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
            mdata = mdata.mssg;
            console.log(mdata);
            //dhmiourgia connection me vash
            var con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "Den8aKsexasw",
              database: "projectweb",
              multipleStatements: true
            });
            //shndesh me vash
            con.connect(function(err) {
              console.log("Connected");
              //mdata[...]...
              var mquery = "UPDATE user SET krousma="+mdata[1]+",pote_ko=\'"+mdata[2]+"\' WHERE username like \'%"+mdata[0]+"%\'";
              con.query(mquery, function (err, result, fields) {
                if (err){
                  throw err;
                }
              });//telos query gia info
            });
            res.end();//end of response
          });//req on end
        }//end if
      });
      //vazw pou eimai
      app.all('/usermeros',function (req, res) {
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
              //dhmiourgia connection me vash
              var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Den8aKsexasw",
                database: "projectweb",
                multipleStatements: true
              });
              //shndesh me vash
              con.connect(function(err) {
                console.log("Connected");
                //mdata[...]...
                var mquery = "INSERT INTO visit(username,pname) VALUES (\'"+mdata[0]+"\', \'"+ mdata[1]+"\');";
                con.query(mquery, function (err, result, fields) {
                  if (err){
                    throw err;
                  }
                });//telos query gia info
              });
              res.end();//end of response
            });//req on end
          }//end if
        });

app.listen(8080, function() {
console.log('Node app is running on port 8080');
});
module.exports = app;
