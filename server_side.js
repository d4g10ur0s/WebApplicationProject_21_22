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
          database: "projectweb"
        });

        con.connect(function(err) {
          console.log("Connected");
          var busert = [];         //vazw ta panta mesa se lista
          var mtypes = {};        //lista gia types
          for(k in mdata){
            //console.log(mdata[k]);
            //prepei na parw ta types
            for(type in mdata[k].types){
              if( mdata[k].types[type] == "point_of_interest" ){
                continue;//ayto to table yparxei hdh ke einai axriasto ws type
              }
              if( !(mdata[k].types[type] in mtypes)){
                console.log(mdata[0]);
                mtypes[mdata[k].types[type]]=[];
                mtypes[mdata[k].types[type]].push(mdata[k].types[type]);
              }//an den einai valto
              else{
                mtypes[mdata[k].types[type]].push(mdata[k].id);
              }
            }
            busert.push([mdata[k].id,mdata[k].name,mdata[k].address,mdata[k].coordinates.lat,mdata[k].coordinates.lng,mdata[k].rating,mdata[k].rating_n]);
          }
          console.log(busert);
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
            console.log(tp);
            con.query("create table if not exists "+mdata[0].types[mtypes]+"(pointid varchar(30));", function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query_1
            //vazw to sxetiko id
            console.log("tha bei "+mdata[0].id);
            con.query("INSERT INTO "+mdata[0].types[mtypes]+" VALUES (\'"+mdata[0].id+"\');", function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query_2
        }//endfor
        // vazw ka8e eidos
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
