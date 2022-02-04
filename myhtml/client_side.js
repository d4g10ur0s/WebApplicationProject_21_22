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

if (mfile) {
    var reader = new FileReader();
    reader.readAsText(mfile, "UTF-8");
    reader.onload = function (evt) {
        var a = evt.target.result;
        a = JSON.parse(a);
        //ola einai se array gia auto den ginontai swsta extract oute stelnontai swsta
        const post_ajax = $.ajax({
          url: 'http://localhost:8080/adminload',
          timeout:6000 ,//3 second timeout
          //contentType: 'application/json',
          data: JSON.stringify(a),
          type: 'POST',
          processData: false,
          success: function (data) {
            console.log('Success: ');
          },
          success: function (data, stat,xhr) {
            console.log('Success: ' + data);
            dtransfered = JSON.parse(data);//pairnw data se morfh json
            alert(dtransfered.msg);
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
