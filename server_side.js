var http = require('http');
var util = require('util');
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
        console.log(mdata[0]);
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
