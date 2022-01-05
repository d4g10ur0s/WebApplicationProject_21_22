var http = require('http');
var util = require('util');
var mysql = require('mysql');
var formidable = require('formidable');

http.createServer(function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        var mdata = JSON.parse(data); // get json data,then bulk
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "projectweb",
          multipleStatements: true
        });

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
        res.end();
      });
    }

    res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });

    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });

    res.end('callback(\'{\"msg\": \"OK\"}\')');

}).listen(8080);
console.log('Server running on port 8080');
