function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    // if came to here, then valid
    return data;
  } catch(e) {
    // failed to parse
    return null;
  }
}

f = document.getElementById('upfile');
var mfile = f.files[0];
console.log(mfile);

if (mfile) {
    var reader = new FileReader();
    reader.readAsText(mfile, "UTF-8");
    reader.onload = function (evt) {
        var a = evt.target.result;
        console.log(a);
        $.ajax({
          url: 'http://localhost:8080',
          data: JSON.stringify(a),
          type: 'POST',
          processData: false,
          success: function (data) {
            console.log('Success: ');
          },
          error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            //$('#lblResponse').html('Error connecting to the server.');
          },
        });
    }
    reader.onerror = function (evt) {
        console.log( "error reading file");
    }
}

//var fr=new FileReader();
//fr.readAsText(
//f.files[0]
//);
//fr.onload=function(){alert(fr.result);}

// Create WebSocket connection.
