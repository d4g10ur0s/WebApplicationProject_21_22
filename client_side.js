
f = document.getElementById('upfile');
var fr=new FileReader();
fr.readAsText(f.files[0]);
//fr.onload=function(){alert(fr.result);}

// Create WebSocket connection.

$.ajax({
        url: 'http://localhost:8080',
        // dataType: "jsonp",
        data: '{"data": "TEST"}',
        type: 'POST',
        //jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            //var ret = jQuery.parseJSON(data);
            //$('#lblResponse').html(ret.msg);
            console.log('Success: ')
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            $('#lblResponse').html('Error connecting to the server.');
        },
    });
