function setup_buttons() {
  document.getElementById('upfile').disabled = true;
  document.getElementById('eisagwgh').addEventListener("click", upl_enable_files);
  document.getElementById('enhmerwsh').addEventListener("click", upd_enable_files);

}

function upl_enable_files(){
  var elem = document.getElementById('upfile');
  document.getElementById("upfile").replaceWith(elem.cloneNode(true));
  document.getElementById('upfile').disabled = false;
  document.getElementById("upfile").addEventListener('change',to_upload);
}

function upd_enable_files(){
  var elem = document.getElementById('upfile');
  document.getElementById("upfile").replaceWith(elem.cloneNode(true));
  document.getElementById('upfile').disabled = false;
  document.getElementById("upfile").addEventListener('change',to_refresh);
}

function to_upload(){
  console.log("ne");
  var myform = document.getElementById("upfile");
  //var formData = new FormData(myform);
  $.ajax({
    url : 'client_side.js',
    type : 'GET',
    data : myform.files[0],
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success : function(data) {
      alert("sunevh");
    //  console.log(data);
    //  alert(data);
    }
  });
}

function to_refresh(){
  console.log("ne");
  var myform = document.getElementById("upfile");
  //var formData = new FormData(myform);
  $.ajax({
    url : 'admin_enhmerwsh.js',
    type : 'GET',
    data : myform.files[0],
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success : function(data) {
      alert("sunevh");
    //  console.log(data);
    //  alert(data);
    }
  });
}

$('#dbutton').on('click',async function (e) {
  e.preventDefault();
  const post_ajax = $.ajax({
    url: 'http://localhost:8080/admindelete',
    timeout:6000 ,//3 second timeout
    //contentType: 'application/json',
    data: "",
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
});

$('#nav-profile-tab').on('click', function (e) {
  console.log("eeee");
  var dtransfered = "";
  var mvisits , mkrousma;
  e.preventDefault();

  post_ajax = $.ajax({
    url: 'http://localhost:8080/admin_count',
    type: 'GET',
    processData: false,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    success: function (data, stat,xhr) {
      console.log('Success: ' + data);
      dtransfered = JSON.parse(data);//pairnw data se morfh json
      console.log(dtransfered);
      mvisits = dtransfered.message1;
      mkrousma = dtransfered.message2;
      monkrousma = dtransfered.message3;
      katataksh = dtransfered.message4;
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + error.message);
      $('#lblResponse').html('Error connecting to the server.');
    }
  });//ajax gia na pairnw info gia visits
  post_ajax.done( function (){
    $("<tr><td>"  +  mvisits[0].c + "</td></tr>").appendTo("#total_visits");
    console.log("edw");
    $("<tr><td>" +mkrousma[0].c + "</td></tr>").appendTo("#total_krousma");
    $("<tr><td>" +monkrousma + "</td></tr>").appendTo("#total_krousma_on");
    for(i in katataksh){
      $("<tr><td>" + i + "</td><td>" +  katataksh[i] + "</td></tr>").appendTo("#katataksh");
    }
  });
  $(this).tab('show');
});//telos gia nav tab


setup_buttons();
