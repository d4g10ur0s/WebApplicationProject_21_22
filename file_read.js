const fs = require('fs');
const express = require('express');
var app = express();

console.log("done");
// `bodyParser` includes `multipart`
app.use(express.bodyParser());

app.post('/', function(req, res, next){
// assuming <input type="file" name="upload">

  var path = req.files.upfile.path;
  var name = req.files.upfile.name;
  try {
    const data = fs.readFileSync(path, 'utf8')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
});
