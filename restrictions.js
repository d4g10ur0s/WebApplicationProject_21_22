function myFunction() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


function validatePassword() {
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
    if (validatePassword()) {
      //ayto prepei na phgainei eite se admin eite se user
        document.location.href = "adminpage.html";
    }
}


/*let database = [
    ["john", "doe"],
    ["john", "wick"],
]


const InputField = document.querySelector("#logButton");
let account_exists = false;
InputField.addEventListener('click', function() {

    let username = document.querySelector("#usernameInput").value;
    let password = document.querySelector("#passwordInput").value;
    let email = document.querySelector("#usernameInput").value;

    for (let i = 0; i < database.length; i++) {
        if (username == database[i][0] && password == database[i][1]) {
            account_exists = true;
            account_loged = i;
            break;
        }
    }

    if (account_exists) {
        console.log("account exists " + account_exists);
        console.log("account logged " + database[0][0]);
        location.replace("userpage.html");
    } else {

        if (document.querySelector("#error_msg") == null) {
            console.log("not ex");
            error_message = document.createElement("span");
            error_message.appendChild(document.createTextNode("username or password that you've entered is incorrect !"));
            error_message.setAttribute("id", "error_msg");

            container = document.querySelector("#error_msg_cont");
            container.appendChild(error_message);
        }
    }
    account_exists = false;
});  */
