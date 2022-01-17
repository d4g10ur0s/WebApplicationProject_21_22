function setup_buttons() {
  document.getElementById('upfile').disabled = true;
  document.getElementById('eisagwgh').addEventListener("click", enable_files);
  var finput = document.getElementById("upfile");
  finput.addEventListener('change',to_upload);
}

function enable_files(){
  document.getElementById('upfile').disabled = false;
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


setup_buttons();
