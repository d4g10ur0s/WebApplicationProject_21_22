var map = "";
var pos_center = "";

$('#sform').submit(function (e) {
     var dtransfered = "";
     e.preventDefault();
     var val = document.getElementById("usrsearch").value;
     if(val){
       console.log(val);
       var mmsg = {message : val};
       console.log(mmsg.message);
     $.ajax({
       url: 'http://localhost:8080/usrpointers',
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
       var inRange = [], latlng_a = new L.LatLng(pos_center[0],pos_center[1]), latlng_b;
       for(d in dtransfered){
         latlng_b = new L.LatLng(dtransfered[d].lat ,dtransfered[d].lon);
         if ( (latlng_a.distanceTo(latlng_b)/1000).toFixed(0) < 5000) {
           inRange.push(dtransfered[d]);
         }
       }
       dtransfered = inRange;
       console.log("egine");
       for(d in dtransfered){
         console.log("egine");
         var marker = L.marker([dtransfered[d].lat,dtransfered[d].lon]).addTo(map)
         .bindPopup(dtransfered[d].name+'\n'+dtransfered[d].address)
         .openPopup();
       }
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
 //vriskw topo8esia
 function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(retPos,showError);
   }
 }
 //epistrefw 8esh
 function retPos(pos) {
   map = L.map('map',{minZoom:13.25}).setView([pos.coords.latitude,pos.coords.longitude], 18);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
   pos_center = [pos.coords.latitude, pos.coords.longitude];
   //var points = [
   //  [pos_center[0]+(0.00461 * 5), pos_center[1]] ,[pos_center[0],pos_center[1]+(0.00981*5)] ,
   //  [pos_center[0]-(0.00461 * 5), pos_center[1]] ,[pos_center[0],pos_center[1]-(0.00981*5)]
   //];
   //let polygon = L.polygon(points).addTo(map);
   let ex = L.circle(pos_center,5000).addTo(map);
   //diastaseis shmeiwn mou :
   //38.25424  (0.00461), 21.73744(0.00981) *2.5
   //38.25886, 21.74725
   // apokliseis pos.coords.latitude - 0.00103, pos.coords.longitude - 0.00721
   L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
   .bindPopup('You Are Here !')
   .openPopup();
 }
 //an yparksei error
 function showError(error) {
   switch(error.code) {
     case error.PERMISSION_DENIED:
       alert("User denied the request for Geolocation.");
       break;
     case error.POSITION_UNAVAILABLE:
       alert("Location information is unavailable.");
       break;
     case error.TIMEOUT:
       alert("The request to get user location timed out.");
       break;
     case error.UNKNOWN_ERROR:
       alert("An unknown error occurred.");
       break;
     }
   }
   //epestrepse mou ton xarth
   getLocation();
