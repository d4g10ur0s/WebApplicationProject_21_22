
$('#sform').submit(function (e) {
     e.preventDefault();
     var val = document.getElementById("usrsearch").value;

     if(val){
       console.log(val);
     }
     $.ajax({
       url: 'http://localhost:8080/kati',
       data: val,
       type: 'POST',
       processData: false,
       headers: {
          "Access-Control-Allow-Origin" : "*"
      },
       success: function (data) {
         console.log('Success: ' + val.toString());
       },
       error: function (xhr, status, error) {
         console.log('Error: ' + error.message);
         $('#lblResponse').html('Error connecting to the server.');
       },
     });
     return false;
 });
