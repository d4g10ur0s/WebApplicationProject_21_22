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
  var myform = document.getElementById("fileform");
  var formData = new FormData(myform);
  $.ajax({
    url : 'file_read.js',
    type : 'GET',
    data : formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success : function(data) {
      alert("sunevh");
      console.log(data);
      alert(data);
    }
  });
}



setup_buttons();
