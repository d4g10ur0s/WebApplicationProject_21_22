
$('#sform').submit(function (e) {
     var dtransfered = "";
     e.preventDefault();
     var val = document.getElementById("usrsearch").value;
     if(val){
       console.log(val);
       var mmsg = {message : val};
       console.log(mmsg.message);
     $.ajax({
       url: 'http://localhost:8080/kati',
       data: JSON.stringify(mmsg.message),
       type: 'POST',
       processData: false,
       headers: {
          "Access-Control-Allow-Origin" : "*"
      },
       success: function (data, stat,xhr) {
         console.log('Success: ' + data);
         dtransfered = JSON.parse(data);//pairnw data se morfh json
         console.log(dtransfered);
       },
       error: function (xhr, status, error) {
         console.log('Error: ' + error.message);
         $('#lblResponse').html('Error connecting to the server.');
       }
     });//prwto ajax
     $(document).ajaxComplete(function () {
       let map = document.getElementById("map");
       console.log(dtransfered[0].lat);
       var marker = L.marker([dtransfered[0].lat,dtransfered[0].lon]).addTo(map);
     });
     $.ajax({
       async: false,
       url: this.href,
       success: function (result) {
         console.log('success');
       },
       error: function (xhr, ajax, err) {
         console.error('error: ' + JSON.stringify(xhr));
         console.error(JSON.stringify(err));
       }
     });
   }
   return false;
 });
