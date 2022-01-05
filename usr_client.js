function send_info(){
  var val = document.getElementById("usrsearch").value;

  if(val){
    console.log(val);
  }

}

var mform = document.getElementById("sform");
mform.addEventListener("submit",send_info);
