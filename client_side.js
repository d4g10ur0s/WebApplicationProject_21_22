
f = document.getElementById('upfile');
var fr=new FileReader();
fr.readAsText(f.files[0]);
//fr.onload=function(){alert(fr.result);}

// Create WebSocket connection.

const express = require('express');
const app = express();

var computerSciencePortal = "GeeksforGeeks";

app.get('/' , (req,res)=>{
   // Server will send GeeksforGeeks as response
   res.send(computerSciencePortal);
})
