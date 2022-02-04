
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
//o admin diagrafei info
app.all('/admindelete',async function (req, res) {
  var meres = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
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
      //otan exeis diavasei olo to data
      req.on("data",()=>{});
      req.on("end",async () => {
        //dhmiourgia connection me vash
        const con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "projectweb",
          multipleStatements: true
        });
        //shndesh me vash
        con.connect(function(err) {
          for(i in meres){
            console.log(meres[i]);
            var mquery = "DELETE FROM "+meres[i]+" WHERE id like \'%%\';";
            con.query(mquery, function (err, result, fields) {
              if (err){
                throw err;
              }
            });//telos query gia delete
          }
          var mquery = "DELETE FROM point_of_interest WHERE name like \'%%\';";
          con.query(mquery, function (err, result, fields) {
            if (err){
              //throw err;
            }
          });//telos query gia delete
        });//telos sundeshs
      });//req on end
      res.end();
    }
});
//o admin vazei info
var admin_message = {msg : "Έγινε."};
app.all('/adminload',async function (req, res) {
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
      var body = [];
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      //otan exeis diavasei olo to data
      req.on("end",async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        //dhmiourgia connection me vash
        const con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Den8aKsexasw",
          database: "projectweb",
          multipleStatements: true
        });
        //shndesh me vash

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
        const connection_ended = await con.connect(async function(err) {

          //vazw point of interest info (id name address lat lon rating rating_n)
          //mdata[...]...
          //const query = util.promisify(con.query).bind(con);
          var sunexeia = true;
          var mquery = "INSERT INTO point_of_interest(id,name,address,lat,lon,rating,rating_n) VALUES ?";

          const dup_error = await con.query(mquery,[busert], async function (err, result, fields) {
            if (err){
              admin_message = {msg : "Υπάρχει ήδη.\nΠήγαινε Ενημέρωση"};
              sunexeia = false;
            }
            //throw err;
            if(sunexeia){
              admin_message = {msg : "Έγινε."};
              console.log(sunexeia);
              //vazw ka8e eidos
              for(tp in mtypes){
                con.query("create table if not exists "+tp+"(pointid varchar(30));", function (err, result, fields) {
                  if (err){
                    //throw err;
                  }
                });//telos query_1
                //vazw to sxetiko id
                var tload = mtypes[tp];
                var mquery = "INSERT INTO "+tp+"(pointid) VALUES ?";
                con.query(mquery,[tload] ,function (err, result, fields) {
                  if (err){
                    //throw err;
                  }
                });//telos query_2
              }//endfor
              // vazw ka8e eidos
              //vazw se hmeres
              for(d in mdayz){
                console.log("den mphke");
                var mquery = "INSERT INTO "+d+"(id,i,ii,iii,iv,v,vi,vii,viii,ix,x,xi,xii,xiii,xiv,xv,xvi,xvii,xviii,xix,xx,xxi,xxii,xxiii,xxiv) VALUES ?";
                con.query(mquery,[mdayz[d]], function (err, result, fields) {
                  if (err){
                    //throw err;
                  }
                });//telos query gia mia hmera
              }//vazw hmeres
            }//endifsunexeia
            res.write(JSON.stringify(admin_message));
            return res.end();//telos sundeshs
          });//telos query gia info
        });//telos connect
      });
    }
});
//o admin vazei pragmata
//o admin vlepei panw statistika
app.all('/admin_count',async function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
    res.writeHead(200);
    res.end();
  }else if(req.method==='GET'){
    var to_send = {message1 : "", message2 : "",message3 : "",message4 : ""};
    //h katallhlh kefalida
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    var body = [];
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Den8aKsexasw",
      database: "projectweb",
      multipleStatements: true
    });
    //shndesh me vash
    con.connect(async function(err) {
      console.log("Connected");

      var mquery = "select count(*) as c from visit;";
      await con.query(mquery,async function (err, result, fields) {
        if (err){
          throw err;
        }
        to_send.message1 = result;
      });

      var mquery = "select count(*) as c from krousma;";//select count(*) from ( (select * from visit) as t1 inner join (select * from krousma) as t2 on t2.username=t1.username);
      await con.query(mquery,async function (err, result, fields) {
        if (err){
          throw err;
        }
        to_send.message2 = result;
      });

      //end of last query
      var mquery = "select t2.pote,t1.tm,t1.pname from ( (select * from visit) as t1 inner join (select * from krousma) as t2 on t2.username=t1.username );";
      await con.query(mquery,async function (err, result, fields) {
        if (err){
          throw err;
        }
        async function metrhths(){
          var mycounter = 0;
          for(sults in result){
            var d1 = String(result[sults].tm);
            d1 = new Date(d1);
            var d2 = String(result[sults].pote);
            d2 = new Date(d2);
            var Difference_In_Time = d1.getTime() - d2.getTime();
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if(Difference_In_Days >= 14 || Difference_In_Days <= -14){
              mycounter+=1;
            }
          }
          return mycounter;
        }
        to_send.message3 = await metrhths();
      });

      var mquery = "select num_of_people,pname from visit where ekt=1;";
      await con.query(mquery,async function (err, result, fields) {
        if (err){
          throw err;
        }
        async function metrhths(result){
          var mycounter = -1;//afou exw array prepei na ksekinaw apo 0
          var onomata = [];//pairnw ta diaforetika onomata
          for(sults in result){
            onomata.push(result[sults].pname);//pairnw ola ta onomata
          }
          async function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }

          onomata = await onomata.filter((v, i, a) => a.indexOf(v) === i);//pairnw monadika
          console.log(onomata);
          var metrhseis = [];//oi metrhseis sthn idia 8esh me ka8e onoma
          for(o in onomata){
            mycounter+=1;
            metrhseis[mycounter] = 0;//oi metrhseis sthn idia 8esh me ka8e onoma
            for(sults in result){
              if(o==result[sults].pname){
                metrhseis[mycounter]+=result[sults].num_of_people;
              }
            }//end sults
          }//end o
          ola = [];//ta vazw ola gia taksinomhsh
          for(let i=0; i<onomata.length; i++ ){
            ola.push([onomata[i],metrhseis[i]]);//vazw se mia lista 2ades apo onoma-metrhsh
          }
          onomata = [];
          for(let i=0; i<ola.length; i++ ){
            best = ola[i];
            best = best[1];
            ibest = i;//index na kserw poio vlepw
            for(let j=0; j<ola.length; j++ ){
              if(!(j==i)){
                temp_best = ola[j];
                temp_best = temp_best[1];
                if(temp_best>=best){
                  best=temp_best;
                  ibest = j;//vazw ws index to megalutero
                }
              }
            }
            //exw parei to kalutero
            var nm = ola[ibest];
            nm = nm[0];
            ola[ibest] = [nm,0];//kanw 0 thn metrhsh gia na einai pleon h mikroterh
            onomata.push(nm);//vazw to onoma me to megalutero
          }
          return onomata;
        }
        to_send.message4 = await metrhths(result);
        await console.log(to_send);
        await res.write(JSON.stringify(to_send));
        await res.end();//end of response
      });

    });//end connection
  }//end if
});
//o admin vlepei panw statistika
//gia na vazw pointers se map
app.all('/usrpointers',async function (req, res) {
  var mymessage = {message1 : [],message2 : [],message3: [],message4 : [],message5 :""};
  done = false;
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  var info = "";
  var body = [];
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
  }else if(req.method==='POST'){//gia post
    //diavazw data
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    //otan exeis diavasei olo to data
    req.on("end",async () => {

      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        //"Keep-Alive" : "timeout=80"
      });
      //dhmiourgia sundeshs
      const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Den8aKsexasw",
        database: "projectweb",
        multipleStatements: true
      });
      console.log(req.url);
      info = Buffer.concat(body).toString();
      info = JSON.parse(info);//parsing json
      info = info.message;
      body = info;//exw thn plhroforia se body
      //sundeh me vash
      con.connect(async function(err) {
        console.log("Connected");
        var mquery = "select point_of_interest.name,t2.*,point_of_interest.address,point_of_interest.lon,point_of_interest.lat,point_of_interest.rating,point_of_interest.rating_n from point_of_interest inner join ((select (pointid) from "+ body+") as t1 inner join (select * from "+td()+") as t2 on t2.id=t1.pointid )on t1.pointid=point_of_interest.id";
        await con.query(mquery,async function (err, result, fields) {
          //an auto pou epsaksa den yparxei
          if (err){
            mymessage.message1 = "Δεν υπάρχει "+body;
            mymessage.message5 = false;
            res.write(JSON.stringify(mymessage));
            res.end();
          }else{
            //prwto query
            //8a ginei me Promise
            async function help_me_god(info,res,mymessage){
              //ena voh8htiko function
              async function my_sum(body,mymo,info){
                await console.log("+mvainei");
                for (let i = 0; i <= 2; i++) {//gia ka8e wra
                  var today = new Date();
                  var time = ConvertNumberToTwoDigitString(today.getHours()-i+1);
                  for(j in info){
                    body = [];
                    //console.log(info[j].name);
                    var mquery = "select num_of_people from visit where ekt=1 and tm like \'%"+ time +":%\' and pname like \'%"+info[j].name+"%\';";
                    await con.query(mquery,await async function (err, result, fields) {
                      for(j in result){
                        body.push(parseInt(result[j].num_of_people));
                        console.log(body);
                      }
                    });//telos query gia visit
                    var sm = 0;
                    await console.log(body);
                    for(k in body){sm = await sm + body[k];}
                    await mymo.push(sm/body.length);
                    //await console.log(mymo);
                  }//gia ka8e onoma
                }//endfor i
                return [body,mymo];
              }//end_my_sum

              var mymo = [];
              info = await result;
              await console.log("phra result");
              mymessage.message1 = await JSON.stringify(result);

              body = await my_sum(body ,mymo ,info);
              mymo = await body[1];
              body = await body[0];
              await console.log(info);
              mymessage.message2 = await mymo;
              mymessage.message5 = await true;
              return mymo;
            }
            //arxh tou query 2
            var mymo = await help_me_god(info,res,mymessage);
            await console.log(mymo);
            await res.write(JSON.stringify(mymessage));
            await res.end();
          }
        });//telos query 1 gia info
      });//telos connect
    });

    res.on('error', (err) => {
      console.error(err);
    });
  }//end post
});

//gia na vazw pointers

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
      body.push(chunk);
    });
    //otan exeis diavasei olo to data
    req.on("end", () => {
      var mdata = Buffer.concat(body).toString();
      mdata = JSON.parse(mdata);//parsing json
      mdata = mdata.mssg;
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

          //auto einai gia na douleuei ws paradeigma
          var point1 = {lat : 38.2496651 ,lng : 21.7390541};
          //auto einai gia na douleuei ws paradeigma

          //auto einai to kanoniko
          //var point1 = {lat : mdata[1] ,lng : mdata[2]};
          //auto einai to kanoniko

          for(i in result){
            var point2 = {lat : result[i].lat , lng : result[i].lon};//pairnw to 2o point
            var haversine_m = haversine(point1, point2); //metraw apostash
            //var haversine_km = haversine_m /1000; //Results in kilometers
            if(haversine_m < 20){
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
});
//gia na vazei o user location

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
    var mmsg = {};
    //h katallhlh kefalida
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    //diavase data
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    //otan exeis diavasei olo to data
    req.on("end", () => {
      var mdata = Buffer.concat(body).toString();
      mdata = JSON.parse(mdata);//parsing json
      mdata = mdata.mssg;
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
        var k = false;
        console.log("Connected To Database");
        var mquery = "SELECT pote FROM krousma WHERE username like \'%"+mdata[0]+"%\'";
        con.query(mquery, function (err, result, fields) {
          if (err){
            throw err;
          }
          //pairnw oles tis dhlwseis ke vlepw an kapoia einai prosfath
          if(!(result.length == 0)){
            for(sults in result){
              var d1 = mdata[2];
              d1 = new Date(d1);
              var d2 = String(result[sults].pote);
              d2 = new Date(d2);
              var Difference_In_Time = d1.getTime() - d2.getTime();
              // To calculate the no. of days between two dates
              var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
              if(Difference_In_Days >= 14){
                k = true;
              }else{
                k=false;
              }
            }
            if(k){
              //mdata[...]...
              var mquery = "INSERT INTO krousma(username,pote) VALUES (\'"+mdata[0]+"\',\'"+mdata[2]+"\');";
              con.query(mquery, function (err, result, fields) {
                if (err){
                  throw err;
                }
              });//telos query gia info
              mmsg = {msg : "Έγινε."};
            }else{
              mmsg = {msg : "Έχετε ήδη δηλωθεί ως κρούσμα."};
            }
            res.write(JSON.stringify(mmsg));
            res.end();//end of response
          }//an exei dhlw8ei ws krousma
          else{
            //an den exei dhlw8ei pote ws krousma paei kateu8eian edw
            var mquery = "INSERT INTO krousma(username,pote) VALUES (\'"+mdata[0]+"\',\'"+mdata[2]+"\');";
            con.query(mquery, function (err, result, fields) {
              if (err){
                throw err;
              }else{
                mmsg = {msg : "Έγινε."};
                res.write(JSON.stringify(mmsg));
                res.end();//end of response
              }
            });//telos query gia info
          }//telos else length == 0
        });//telos query gia na dw an exei dhlw8ei ws krousma
      });//sundesh me vash
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
              mdata = mdata.msg;6
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
        });//vazw pou eimai
        //vazw ektimhsh
        app.all('/userektimhsh',function (req, res) {
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
                  var mquery = "UPDATE visit SET ekt="+1+",num_of_people="+ mdata[1]+" WHERE username like \'%"+mdata[0]+"%\' AND tm like \'%"+mdata[2]+"%\';";
                  console.log(mquery);
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
//gia login
app.all('/userlogin',function (req, res) {
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
        var mmsg = {mssg : true};
        console.log("Connected");
        //mdata[...]...
        var mquery = "SELECT username,password,email FROM user where username like \'%"+mdata.username+"%\' and email like \'%"+ mdata.email+"%\';";
        con.query(mquery, function (err, result, fields) {
          if (err){
            throw err;
          }
          if(result.length == 0){
            mmsg = {mssg : false, merror : "username"};
            res.write(JSON.stringify(mmsg));
            res.end();//end of response
            //la8os username h email
          }else{
            if(result[0].password.trim() == mdata.password){
              console.log(mmsg);
              res.write(JSON.stringify(mmsg));
              res.end();//end of response
            }else{
              mmsg = {mssg : false, merror : "password"};
              res.write(JSON.stringify(mmsg));
              res.end();//end of response
            }
          }
        });//telos query gia info
      });
    });//req on end
  }//end if
});
//gia login

//gia register
app.all('/userregister',function (req, res) {
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
        var mmsg = {mssg : true};
        console.log("Connected");
        //mdata[...]...
        var mquery = "INSERT INTO user(username,password,email) VALUES (\'"+mdata.username+"\',\'"+ mdata.password +"\' , \'"+ mdata.email+"\');";
        con.query(mquery, function (err, result, fields) {
          if (err){
            throw err;
          }
          if(result.length == 0){
            mmsg = {mssg : false, merror : "username"};
            res.write(JSON.stringify(mmsg));
            res.end();//end of response
            //la8os username h email
          }else{
            console.log(mmsg);
            res.write(JSON.stringify(mmsg));
            res.end();//end of response
          }
        });//telos query gia info
      });
    });//req on end
  }//end if
});
//gia register

//vazw visit content
app.all('/uservisitcontent',function (req, res) {
  var mymessage = {message1: [],message2 : []};
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
      mdata = mdata.name;
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
        var mquery = "SELECT tm,num_of_people,pname FROM visit WHERE username like \'%"+mdata+"%\';";
        console.log(mquery);
        con.query(mquery, function (err, result, fields) {
          if (err){
            throw err;
          }
          console.log(result);
          mymessage.message1 = result;
          var mquery = "SELECT * FROM krousma WHERE username like \'%"+mdata+"%\';";
          console.log(mquery);
          con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
            mymessage.message2 = result;
            res.write(JSON.stringify(mymessage));
            res.end();//end of response
          });//telos query gia krousma
        });//telos query gia visit
      });//telos connect
    });//req on end
  }//end if
});//vazw pou eimai

//vazw visit content
app.all('/userchange',async function (req, res) {
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
      con.connect(async function(err) {
        console.log("Connected");
        //mdata[...]...
        if(mdata.username.length > 1){
          var mquery = "UPDATE user SET username=\'"+mdata.username+"\' WHERE username like \'"+mdata.current_username+"\';";//prepei na vrw ke to error
          console.log(mquery);
          const prwto = await con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
          });//telos query gia info
        }//if gia username
        if (mdata.password.length > 1) {
          var mquery = "UPDATE user SET password=\'"+mdata.password+"\' WHERE username like \'%"+mdata.current_username+"%\';";
          console.log(mquery);
          const deytero = await con.query(mquery, function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
          });//telos query gia info
        }//if gia password
        const grafei = await res.write(JSON.stringify({mssg : 1, message : "egine"}));
        res.end();//end of response
      });
    });//req on end
  }//end if
});
//gia na allazw info

//epafh me krousma
app.all('/epafh_me_krousma',async function (req, res) {
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
      mdata = mdata.username;
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
      await con.connect(async function(err) {
        //1.  pairnw ola ta visits pu exw kanei ws user (tis teleutaies 7 hmeres)
        async function help_me_god(my_visits){
          var to_ret = [];
          var ta_krousmata=[];
          for(i=0; i<7; i++){
            var today = await new Date();
            var tumhnos = await today.getDate();
            var omhnas = today.getMonth();
            var temp_tumhnos;

            tumhnos = tumhnos-i;
            console.log(tumhnos);
            if(tumhnos<=0){

              if(omhnas-1<0){
                omhnas = 11;
              }//tote paw dekemvrio
              //exw hdh afairesei i;
              var oi_31 = [0,2,4,6,7,9,11];
              if(omhnas in oi_31){
                temp_tumhnos = 31 + tumhnos;
              }else if (omhnas == 1) {
                if(today.getFullYear()%4==0){
                  temp_tumhnos = 29 + tumhnos;
                }else{
                  temp_tumhnos = 28 + tumhnos;
                }//ke ta disekta
              }else{
                temp_tumhnos = 30 + tumhnos;
              }
            }else{
              temp_tumhnos = tumhnos;
            }
            //telos fixarismatos date
            var mquery = "select tm,pname from visit where username like \'%"+mdata+"%\' and tm like \'%"+"-"+ConvertNumberToTwoDigitString(omhnas+1)+"-"+ConvertNumberToTwoDigitString(temp_tumhnos)+"%\';";
            //console.log(mquery);
            await con.query(mquery,async function (err, result, fields) {
              if (err){
                throw err;
              }
              await my_visits.push(result);
            });//telos query gia info
            var mquery = "select t1.username,t2.tm,t2.pname from ( (select * from krousma where pote like \'%"+"-"+ConvertNumberToTwoDigitString(omhnas+1)+"-"+ConvertNumberToTwoDigitString(temp_tumhnos)+"%\') as t1 inner join (select * from visit where tm like \'%"+"-"+ConvertNumberToTwoDigitString(omhnas+1)+"-"+ConvertNumberToTwoDigitString(temp_tumhnos)+"%\') as t2 on t1.username=t2.username );";
            //console.log(mquery);
            await con.query(mquery,async function (err, result, fields) {
              if (err){
                throw err;
              }
              await ta_krousmata.push(result);
            });//telos query gia info
            //2.  pairnw ta koina me ton user mu visits (vash wras ,+-2 ke hmeras , idia)
            await asyncForEach();
            for(v in my_visits[my_visits.length-1]){
              console.log(new Date(my_visits[my_visits.length-1][v].tm));
              for(k in ta_krousmata[ta_krousmata.length-1]){
                if(getDifferenceInHours(new Date(my_visits[my_visits.length-1][v].tm),new Date(my_visits[ta_krousmata.length-1][k].tm)) < 2){
                  to_ret.push(my_visits[my_visits.length-1][v]);
                  break;
                }
                await asyncForEach();
              }//gia ka8e episkepsh krousmatos
              await asyncForEach();
            }//gia ka8e episkepsh mu

          }
          await console.log(my_visits);
          await console.log(ta_krousmata);
          await console.log(to_ret);
          return to_ret;
        }
        //3.  pairnw poia visits htan krousmata (+- 7 hmeres)
        await console.log("Connected");
        var my_visits = await [];
        my_visits = await help_me_god(my_visits);
        await console.log("edw");
        await res.write(JSON.stringify({mssg : 1, message : my_visits}));
        await res.end();//end of response
      });
    });//req on end
  }//end if
});
//epafh me krousma

app.use(express.static(path.join(__dirname, '/myhtml')));
app.get('/', function (request, response) {
        response.sendFile(path.join(__dirname, '/myhtml'));
});
app.listen(8080, function() {
  console.log('Node app is running on port 8080');
});
module.exports = app;

function asyncForEach() {
  return new Promise((resolve) => {
    setTimeout(function() {
      return resolve();
    }, 10);
  })
}

function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

function ConvertNumberToTwoDigitString(n) {
  return n > 9 ? "" + n : "0" + n;
}
