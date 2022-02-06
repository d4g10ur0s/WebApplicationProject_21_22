
function username_correct(){
  var p = document.getElementById("usernameInput").value,errors = [];;

  if(p.length > 7){//apla panw apo 7 grammata,ola epitrepontai
    return true;
  }else{
    errors.push("Username must be further that 7 digits.");
    alert(errors.join("\n"));
    return false;
  }
}


function email_correct(){
  var p = document.getElementById("emailInput").value,errors = [];
  console.log(p.includes(".com"));
  if (p.search(/[@]/) > 0 && p.includes(".com")) {
    return true;
  }else if (p.length < 2) {

    errors.push("Προσπάθεια σύνδεσης ως admin.");
    alert(errors.join("\n"));
    return false;

  }else{

    errors.push("Incorrect email.");
    alert(errors.join("\n"));
    return false;

  }
}

function password_correct() {
    var p = document.getElementById("passwordInput").value,
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

function loginOnClick() {
    if (password_correct() && username_correct() ) {
      if(email_correct()){//gia user
        mmsg = {
          username : document.getElementById("usernameInput").value,
          password : document.getElementById("passwordInput").value,
          email : document.getElementById("emailInput").value
        };
        $.ajax({
          url: 'http://localhost:8080/userlogin',
          data: JSON.stringify(mmsg),
          type: 'POST',
          processData: false,
          headers: {
            "Access-Control-Allow-Origin" : "*"
          },
          success: function (data, stat,xhr) {
            console.log('success' + data);
            data = JSON.parse(data);
            if(data.mssg){
              localStorage.setItem("storageName",JSON.stringify(mmsg));
              document.location.href = "userpage.html";
            }else{
              console.log(data.error)
              if(data.merror == "password"){
                alert("Λάθος password.");
              }else{
                alert("Λάθος username ή e-mail.\nΉ νέα εγγραφή.");
              }
            }
          },
          error: function (xhr, ajax, err) {
            console.error('error: ' + JSON.stringify(xhr));
            console.error(JSON.stringify(err));
          }
        });//end ajax post
      }//gia ton user
      else{
        mmsg = {
          username : document.getElementById("usernameInput").value,
          password : document.getElementById("passwordInput").value
        };
        $.ajax({
          url: 'http://localhost:8080/adminlogin',
          data: JSON.stringify(mmsg),
          type: 'POST',
          processData: false,
          headers: {
            "Access-Control-Allow-Origin" : "*"
          },
          success: function (data, stat,xhr) {
            console.log('success' + data);
            data = JSON.parse(data);
            if(data.mssg){
              document.location.href = "adminpage.html";
            }else{
              console.log(data.error)
              if(data.merror == "password"){
                alert("Λάθος password.");
              }else{
                alert("Λάθος username admin.");
              }
            }
          },
          error: function (xhr, ajax, err) {
            console.error('error: ' + JSON.stringify(xhr));
            console.error(JSON.stringify(err));
          }
        });//end ajax post
      }
      //ayto prepei na phgainei eite se admin eite se user
    }//endif
}
function registerOnClick() {
    if (password_correct() && username_correct() && email_correct()) {
      mmsg = {
        username : document.getElementById("usernameInput").value,
        password : document.getElementById("passwordInput").value,
        email : document.getElementById("emailInput").value
      };
      $.ajax({
        url: 'http://localhost:8080/userregister',
        data: JSON.stringify(mmsg),
        type: 'POST',
        processData: false,
        headers: {
           "Access-Control-Allow-Origin" : "*"
       },
        success: function (data, stat,xhr) {
          console.log('success' + data);
          data = JSON.parse(data);
          if(data.mssg){
            localStorage.setItem("storageName",JSON.stringify(mmsg));
            document.location.href = "userpage.html";
          }else{
            console.log(data.error)
            if(data.merror == "password"){
              alert("Λάθος password.");
            }else{
              alert("Λάθος username η e-mail.");
            }
          }
        },
        error: function (xhr, ajax, err) {
          console.error('error: ' + JSON.stringify(xhr));
          console.error(JSON.stringify(err));
        }
      });//end ajax post
      //ayto prepei na phgainei eite se admin eite se user
    }//endif
}
