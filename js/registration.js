//values from the user input
var nameValue = document.getElementById("name");
var addressValue = document.getElementById("address");
var mobileNoValue = document.getElementById("number");
var emailValue = document.getElementById("email");
var passwordValue = document.getElementById("password");

var jsonData = {
    name: nameValue,
    address: addressValue,
    number: mobileNoValue,
    email: emailValue,
    password: passwordValue
}

function showCriteria() {
    // Show the password strength criteria when the user clicks on the text field
    document.getElementById('password-criteria').style.display = 'block';
}

function checkPasswordStrength(password) {
    var strengthLetter = document.getElementById('strength-letter');
    var strengthNumber = document.getElementById('strength-number');
    var strengthChar = document.getElementById('strength-char');
    var submitButton = document.getElementById("submit-button");

    // Check for uppercase letter
    if (/[A-Z]/.test(password)) {
        strengthLetter.innerHTML = "&#10003";
        strengthLetter.className = 'valid';
        document.getElementById('uppercase').style.color = 'green';
    }
    else {
        strengthLetter.innerHTML = "&#10060";
        strengthLetter.className = '';
        document.getElementById('uppercase').style.color = 'red';
    }

    // Check for number
    if (/\d/.test(password)) {
        strengthNumber.innerHTML = "&#10003";
        strengthNumber.className = 'valid';
        document.getElementById('number1').style.color = 'green';
    }
    else {
        strengthNumber.innerHTML = "&#10060";
        strengthNumber.className = '';
        document.getElementById('number1').style.color = 'red';
    }

    // Check for minimum 8 characters
    if (password.length >= 8) {
        strengthChar.innerHTML = "&#10003";
        strengthChar.className = 'valid';
        document.getElementById('min-char').style.color = 'green';
    }
    else {
        strengthChar.innerHTML = "&#10060";
        strengthChar.className = '';
        document.getElementById('min-char').style.color = 'red';
    }
    submitButton.disabled = !(/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8);
}

function submitForm() {
    // Clear password field and reset strength indicators
    document.getElementById('password').value = '';
    document.getElementById('uppercase').style.color = 'red';
    document.getElementById('strength-letter').innerHTML = '&#10060;';
    document.getElementById('number').style.color = 'red';
    document.getElementById('strength-number').innerHTML = '&#10060;';
    document.getElementById('min-char').style.color = 'red';
    document.getElementById('strength-char').innerHTML = '&#10060;';
    
    // Disable the submit button after submission
    document.getElementById('submitButton').disabled = true;

    window.location.href = 'login-page.html';
}

fetch("/api/students", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
})
.then(responser => responser.json())
.then(data => {
    console.log(data);
})
.catch(error =>  {
    console.error("Registration error: " + error);
})