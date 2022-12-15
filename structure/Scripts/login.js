
function password_check(){
  var passw = document.getElementById("inputPassword").value, errors = [];

  if (passw.length < 8) {
    errors.push("Your password must be at least 8 characters");
  }
  if (passw.search(/[A-Z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (passw.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (passw.search(/[!@#$%^&*]/) < 0) {
    errors.push("Your password must contain at least one symbol.");
  }
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}

//etsi einai enas tropos na kanw ajax calls
$('#log_in_button').click(function (event) {
  event.preventDefault();
  if (password_check() && username_check() && email_check()) {
    alert('Koble');
  }else{ alert('Malakeia');}
});
