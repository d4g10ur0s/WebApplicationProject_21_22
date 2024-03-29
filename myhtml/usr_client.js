const wres_meras = [
"I",
"II",
"III",
"IV",
"V",
"VI",
"VII",
"VIII",
"IX",
"X",
"XI",
"XII",
"XIII",
"XIV",
"XV",
"XVI",
"XVII",
"XVIII",
"XIX",
"XX",
"XXI",
"XXII",
"XXIII",
"XXIV"
];
var map = "";
var pos_center = "";
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//user search
$('#sform').submit(function (e) {
  var done = true;
  var dtransfered = "";
  var usrestimation = "";
  var ine;
  e.preventDefault();
  var val = document.getElementById("usrsearch").value;
  if(val){//an yparxei timh entos tu search bar
    var mmsg = {message : val};
    const post_ajax = $.ajax({
      url: 'http://localhost:8080/usrpointers',
      data: JSON.stringify(mmsg),//to kanw stringify
      type: 'POST',
      processData: false,
      timeout:3000, //3 second timeout
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      success: function (data, stat,xhr) {
        dtransfered = JSON.parse(data);//pairnw data se morfh json
        usrestimation = dtransfered.message2;
        ine = dtransfered.message5;
        dtransfered = dtransfered.message1;
      },
      error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });//prwto ajax
    //meta to prwto ajax
    post_ajax.done(function (){
      var user_estimation_strings = [];
      if(!ine){
        done = false;
        alert(dtransfered);
      }else{
        done = true;
        dtransfered = JSON.parse(dtransfered);
      }
      if(done){
        $(document).ajaxComplete(function () {
          var inRange = [], latlng_a = new L.LatLng(pos_center[0],pos_center[1]), latlng_b;
          for(d in dtransfered){
            latlng_b = new L.LatLng(dtransfered[d].lat ,dtransfered[d].lon);
            // if ( (latlng_a.distanceTo(latlng_b)/1000).toFixed(0) < 5000) {
            inRange.push(dtransfered[d]);
            // } //edw otan 8a trexei to kanoniko programma
          }
          dtransfered = inRange;
          for(d in dtransfered){
            //console.log(dtransfered[d].i);
            var b = [dtransfered[d].i,dtransfered[d].ii,dtransfered[d].iii
            ,dtransfered[d].iv,dtransfered[d].v,dtransfered[d].vi,
            dtransfered[d].vii,dtransfered[d].viii,dtransfered[d].ix,
            dtransfered[d].x,dtransfered[d].xi,
            dtransfered[d].xii,dtransfered[d].xiii,dtransfered[d].xiv,
            dtransfered[d].xv,dtransfered[d].xvi,dtransfered[d].xvii,
            dtransfered[d].xviii,dtransfered[d].xix,dtransfered[d].xx,
            dtransfered[d].xxi,dtransfered[d].xxii,dtransfered[d].xxiii,dtransfered[d].xxiv];
            //pairnw sum
            var sum = 0;
            for(i in b){
              sum+=parseInt(i);
            }
            //console.log(sum);
            sum =( parseInt(b[hour-1])/sum )*100;//gia na vgalw xrwma
            var hour = new Date().getHours();
            //console.log(sum);
            var marker;
            //prepei na parw mo ke wra apo userestimation
            let temp_estimation_string = "";
            for(est in usrestimation){
              let to_kleidi = Object.keys(usrestimation[est]);//pairnw ola ta kleidia th 8eshs,einai mono 1.
              if(to_kleidi == dtransfered[d].name){
                to_kleidi = usrestimation[est][to_kleidi];
                temp_estimation_string = temp_estimation_string + " Ώρα : " + to_kleidi[1] + " Μέσος Όρος Εκτίμησης : " + to_kleidi[0] + " \n ";
              }
            }
            if(temp_estimation_string.length > 0){
            }else{//vale 0
              temp_estimation_string = " Μέσος Όρος Εκτίμησης : Δεν Υπάρχουν Εκτιμήσεις. \n ";
            }
            user_estimation_strings.push(temp_estimation_string);

            if(sum > 66){
              marker = L.marker([dtransfered[d].lat,dtransfered[d].lon], {icon: redIcon}).addTo(map)
              .bindPopup(dtransfered[d].name+'\n'+dtransfered[d].address+'\n'+"Estimation : "+b[hour-1]+"\nhour : "+hour+"\nEstimation : "+b[hour]+"\nhour : "+(parseInt(hour)+1)+"\nEstimation : "+b[hour+1]+"\nhour : "+(parseInt(hour)+2) +"\n" + user_estimation_strings[d] )
              .openPopup();
            }else if (sum > 65) {
              marker = L.marker([dtransfered[d].lat,dtransfered[d].lon], {icon: orangeIcon}).addTo(map)
              .bindPopup(dtransfered[d].name+'\n'+dtransfered[d].address+'\n'+"Estimation : "+b[hour-1]+"\nhour : "+hour+"\nEstimation : "+b[hour]+"\nhour : "+(parseInt(hour)+1)+"\nEstimation : "+b[hour+1]+"\nhour : "+(parseInt(hour)+2 )+"\n" + user_estimation_strings[d] )
              .openPopup();
            }else {
              marker = L.marker([dtransfered[d].lat,dtransfered[d].lon], {icon: greenIcon}).addTo(map)
              .bindPopup(dtransfered[d].name+'\n'+dtransfered[d].address+'\n'+"Estimation : "+b[hour-1]+"\nhour : "+hour+"\nEstimation : "+b[hour]+"\nhour : "+(parseInt(hour)+1)+"\nEstimation : "+b[hour+1]+"\nhour : "+(parseInt(hour)+2)+"\n" + user_estimation_strings[d] )
              .openPopup();
            }
          }
        });
        //topo8ethsh se selida
        $.ajax({
          async: false,
          url: this.href,
          error: function (xhr, ajax, err) {
            console.error('error: ' + JSON.stringify(xhr));
            console.error(JSON.stringify(err));
          }
        });
      }//mono an phra pisw apadhsh
    });//post_ajax
  }//end if
  return false;//gia na mhn kanei refrsh tn selida
});
//gia na vazw point_of_interest

//vriskw topo8esia
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(retPos,showError);
  }
}
//vriskw topo8esia

//vazw 8esh se map
function retPos(pos) {
  var usrname = document.getElementById('exw_username').innerHTML;
  usrname = usrname.split(' ');
  var mmsg = {mssg : [usrname[2], pos.coords.latitude, pos.coords.longitude]};
  var point_string = "You Are Here !\nPOIs near You : \n";
  const post_ajax = $.ajax({
    url: 'http://localhost:8080/userloc',
    data: JSON.stringify(mmsg),
    type: 'POST',
    processData: false,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    success: function (data, stat,xhr) {
      dtransfered = JSON.parse(data);//pairnw data se morfh json
      for(i in dtransfered.tret){//gia na pairnw oti vrisketai se apostash 20 metrwn
        const episkepseis = document.getElementById('episkepseis');
        // creating the span element, then add a class attribute
        var kappa = dtransfered.tret[i].name.split(' ');//to prwto akronhmio einai to id
        const btt = document.createElement(kappa[0]);
        btt.setAttribute('class','btn btn-light col-md-4');//ti eidous button
        btt.style.marginRight="5px";
        btt.style.width= "25%";
        btt.innerHTML = dtransfered.tret[i].name; // to onoma tou merous
        point_string = point_string + "\n" + dtransfered.tret[i].name;
        //console.log(point_string);
        btt.addEventListener('click', clickPoint, true);
        btt.myParam = dtransfered.tret[i].name;
        episkepseis.appendChild(btt);
      }//vazw koumbia
      alert("Βρίσκεστε σε κάποιο σημείο ;");
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + error.message);
      $('#lblResponse').html('Error connecting to the server.');
    }
  });//ajax gia na vazw lat lon
  post_ajax.done( function (){
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
    //ta parakatw einai gia paradeigma
    //diastaseis shmeiwn mou :
    //38.25424  (0.00461), 21.73744(0.00981) *2.5
    //38.25886, 21.74725
    // apokliseis pos.coords.latitude - 0.00103, pos.coords.longitude - 0.00721
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
    .bindPopup(point_string)
    .openPopup();
  });
}
//vazw 8esh se map


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

//gia krousma form
$('#krousmaform').submit(function (e) {
  var dtransfered = "";
  e.preventDefault();//mhn kaneis refresh klp...
  var datval = document.getElementById("krousmadate").value;//pairnw mera
  var timval = document.getElementById("krousmatime").value;//pairnw wra
  if( timval == "" && datval == ""){
    alert("Δεν έχετε βάλει ώρα ή ημέρα.");
  }else{
    var usrname = document.getElementById('exw_username').innerHTML;
    usrname = usrname.split(' ');
    //                  to username ,to bit, hmeromhnia
    var mmsg = {mssg : [usrname[2], 1, datval + " " + timval]};
    //epikoinwnia me webserver
    $.ajax({
      url: 'http://localhost:8080/userkrousma',
      data: JSON.stringify(mmsg),
      type: 'POST',
      processData: false,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      success: function (data, stat,xhr) {
        dtransfered = JSON.parse(data);//pairnw data se morfh json
        alert(dtransfered.msg);//eite egine eite exeis hdh dhlw8ei
      },
      error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });//ajax gia na vazw timestamp gia krousma
  }
});
//gia krousma form

//se poio point eimai
function clickPoint(ev){
  var today = new Date();
  var date = today.getFullYear()+'-'+ConvertNumberToTwoDigitString(today.getMonth()+1)+'-'+ConvertNumberToTwoDigitString(today.getDate());
  var time = ConvertNumberToTwoDigitString(today.getHours()) + ":" + ConvertNumberToTwoDigitString(today.getMinutes());
  var usrname = document.getElementById('exw_username').innerHTML;
  usrname = usrname.split(' ');
  var mmsg = {msg : [usrname[2], ev.currentTarget.myParam]};
  $.ajax({
    url: 'http://localhost:8080/usermeros',
    data: JSON.stringify(mmsg),
    type: 'POST',
    processData: false,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    success: function (data, stat,xhr) {
      alert("Η Επίσκεψη καταχωρήθηκε.");
      const myNode = document.getElementById("episkepseis");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }//vgazw ola ta merh pou mporei na eimai
      // koumpi gia ektimhsh
      const btt = document.createElement("ektimish");
      btt.setAttribute('class','btn btn-light col-md-4');//ti eidous button
      btt.innerHTML = 'Εκτίμηση'; // some text to improve visualization
      btt.style.marginRight="5px";
      btt.myParam = date+ ' ' + time;//etsi mporw na anagnwrisw to visit entos ths vashs(username ke timestamp)
      btt.addEventListener('click', clickEktimish, true);
      //btt.addEventListener('click', clickPoint, true);
      //input ektimhshs
      const inp = document.createElement("input");
      inp.setAttribute('type',"text");//gia input
      inp.setAttribute('id',"ektimhsh_input");//gia input
      inp.setAttribute('class','form-control col-md-4 input');//ti eidous input
      inp.style.width = '50px';
      inp.setAttribute('placeholder','Εκτίμηση');//ti eidous input
      //ta vazw
      myNode.appendChild(btt);
      myNode.appendChild(inp);
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + error.message);
      $('#lblResponse').html('Error connecting to the server.');
    }
  });//ajax gia na vazw pou eimai
}
//se poio point eimai

//ektimhsh apo user
function clickEktimish(ev){
  if( isNaN( parseInt(document.getElementById("ektimhsh_input").value) )){//an den einai int mhn synexeis
    alert("Η Εκτίμηση είναι ακέραιος αριθμός.");
  }else{
    var usrname = document.getElementById('exw_username').innerHTML;
    usrname = usrname.split(' ');
    var mmsg = {msg : [usrname[2], document.getElementById("ektimhsh_input").value ,ev.currentTarget.myParam]};
    $.ajax({
      url: 'http://localhost:8080/userektimhsh',
      data: JSON.stringify(mmsg),
      type: 'POST',
      processData: false,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      success: function (data, stat,xhr) {
        alert("Η εκτίμηση καταχωρήθηκε.");
      },
      error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });//ajax gia na vazw pou eimai
    const myNode = document.getElementById("episkepseis");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }//vgazw ola ta merh pou mporei na eimai
  }//telos else
}
//telos ektimhshs

function ConvertNumberToTwoDigitString(n) {
  return n > 9 ? "" + n : "0" + n;
}

//to storage me info gia user
$( document).ready(function() {
  const usinfo = document.getElementById('user_info');
  // creating the span element, then add a class attribute
  var kappa = JSON.parse(localStorage.getItem("storageName"));//to prwto akronhmio einai to id
  const btt = document.createElement("usrinfo");
  btt.setAttribute('id','exw_username');
  btt.innerHTML =  "Username : "+kappa.username + " E-mail : " + kappa.email ; // some text to improve visualization
  usinfo.appendChild(btt);
});
//to storage me info gia user

$('#nav-profile-tab').on('click', function (e) {
  var dtransfered = "";
  var mvisits , mkrousma;
  e.preventDefault();
  var usrname = document.getElementById('exw_username').innerHTML;
  usrname = usrname.split(' ');
  mmsg = {name: usrname[2]};

  const post_ajax = $.ajax({
    url: 'http://localhost:8080/uservisitcontent',
    data: JSON.stringify(mmsg),
    type: 'POST',
    processData: false,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    success: function (data, stat,xhr) {
      dtransfered = JSON.parse(data);//pairnw data se morfh json
      mvisits = dtransfered.message1;
      mkrousma = dtransfered.message2;
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + error.message);
      $('#lblResponse').html('Error connecting to the server.');
    }
  });//ajax gia na pairnw info gia visits
  post_ajax.done( function (){
    $('#myvisits td').remove();
    $('#mykrousma td').remove();

    for(i in mvisits){
      $("<tr><td>" + i + "</td><td>" +  mvisits[i].pname + "</td><td>" +  mvisits[i].num_of_people + "</td><td>" + new Date(mvisits[i].tm).toISOString().replace("T", " ").slice(0, 19)+ "</td></tr>").appendTo("#myvisits");
    }
    for(i in mkrousma){
      $("<tr><td>" + i + "</td><td>" +  mkrousma[i].username + "</td><td>" + new Date(mkrousma[i].pote).toISOString().replace("T", " ").slice(0, 19)+ "</td></tr>").appendTo("#mykrousma");
    }
  });
  $(this).tab('show');
})//telos gia nav tab

function username_corr(){
  var p = document.getElementById("username").value,errors = [];;

  if(p.length > 7){//apla panw apo 7 grammata,ola epitrepontai
    return true;
  }else{
    errors.push("Username must be further that 7 digits.");
    alert(errors.join("\n"));
    return false;
  }
}

function email_corr(){
  var p = document.getElementById("email").value,errors = [];
  console.log(p.includes(".com"));
  if (p.search(/[@]/) > 0 && p.includes(".com")) {
    return true;
  }else{
    errors.push("Your email is wrong.");
    alert(errors.join("\n"));
    return false;
  }
}

function password_corr() {
  var p = document.getElementById("password").value,
  errors = [];
  if (p.length < 8) {
    errors.push("Your password must be at least 8 characters");
  }
  if (p.search(/[A-Z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (p.search(/[!@#$%^&*]/) < 0) {
    errors.push("Your password must contain at least one symbol.");
  }
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
  /*var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
  return regularExpression.test(str);*/
}


//gia na allazei username ke password
$('#new_username').on('click',async function (e) {
  e.preventDefault();
  var usrname = document.getElementById('exw_username').innerHTML;
  usrname = usrname.split(' ');
  var mmsg = {
    current_username : usrname[2],
    username : "",
    password : ""
  };
  var steile = false;
  //gia username
  if (username_corr() || !(document.getElementById("password").value.length==0)) {
    mmsg.username = document.getElementById("username").value;
    steile = true;
  }//endif
  //gia password
  if (password_corr() || !(document.getElementById("username").value.length==0)) {
    mmsg.password=document.getElementById("password").value;
    steile=true;
  }
  if(steile){
    $.ajax({
      url: 'http://localhost:8080/userchange',
      data: JSON.stringify(mmsg),
      type: 'POST',
      processData: false,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      success: function (data, stat,xhr) {
        data = JSON.parse(data);
        if(data.mssg){
          //allazw onoma se katw meros an allakse to username
          if(data.message.length > 0){
            var kappa = JSON.parse(localStorage.getItem("storageName"));//to prwto akronhmio einai to id
            kappa.username = data.message;
            localStorage.setItem("storageName",JSON.stringify(kappa));
            var usrname = document.getElementById('exw_username').innerHTML;
            usrname = usrname.split(' ');
            usrname[2] = data.message;
            var btt  = document.getElementById('exw_username');
            btt.innerHTML =  "Username : "+usrname[2] + " E-mail : " + usrname[5] ; // some text to improve visualization
            //window.location.reload();
            document.getElementById("nav-profile-tab").click();//kaleitai grammh 382
          }
          alert("Η επιτυχής αλλαγή στοιχείων.");
        }else{
          console.log(data.error)
          if(data.merror == "password"){
            alert("Λάθος password.");
          }else{
            alert("Λάθος username η e-mail.\nΉ νέα εγγραφή.");
          }
        }
      },
      error: function (xhr, ajax, err) {
        console.error('error: ' + JSON.stringify(xhr));
        console.error(JSON.stringify(err));
      }
    });//end ajax
    //steile = false;//8a to checkarw meta
  }
});
//gia allagh info

//gia na dw an hr8a se epafh
$('#krousma_contact_button').on('click',async function (e) {
  e.preventDefault();
  var usrname = document.getElementById('exw_username').innerHTML;
  usrname = usrname.split(' ');
  var mmsg = { username : usrname[2] };
  $.ajax({
    url: 'http://localhost:8080/epafh_me_krousma',
    data: JSON.stringify(mmsg),
    type: 'POST',
    processData: false,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    success: function (data, stat,xhr) {
      data = JSON.parse(data);
      $('#lista_me_epafh li').remove();
      alert("Επαφές με κρούσμα.");
      ul = document.createElement('ul');
      ul.setAttribute("class","list-group");
      ul.setAttribute("id","lista_me_epafh");

      document.getElementById('epafh_me_krousma_lista').appendChild(ul);
      for(i in data.message){
        let li = document.createElement('li');
        li.setAttribute("class","list-group-item");
        li.innerHTML += "Ημερομηνία : "+ data.message[i].tm.slice(0, 10) + " " + data.message[i].tm.slice(11, 19)+"\nΜέρος : "+data.message[i].pname;
        ul.appendChild(li);
        alert("Ημερομηνία : "+ data.message[i].tm.slice(0, 10) + " " + data.message[i].tm.slice(11, 19)+"\nΜέρος : "+data.message[i].pname);
      }
    },
    error: function (xhr, ajax, err) {
      console.error('error: ' + JSON.stringify(xhr));
      console.error(JSON.stringify(err));
    }
  });//end ajax
});
//gia na vlepw an hr8a se epafh

getLocation();
