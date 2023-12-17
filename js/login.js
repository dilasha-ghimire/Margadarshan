function validateLogin() {
    clearErrors();

    var email = document.getElementById('email').value;
    var emailError = document.getElementById("emailError");
    var password = document.getElementById('password').value;
    var passwordError = document.getElementById("passwordError");

    var loginData = {
      email: email,
      password: password
    }

    fetch("http://localhost:8080/api/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("Network response failure");
      }
      return response.json();
    })
    .then(result => {
      if(result.success) {
        alert('Login successful!');
        window.location.href = 'homepage1.html';
      }
      else {
        document.getElementById('emailError').textContent = '* Invalid email address';
        document.getElementById('email').classList.add('error');
        emailError.className = "error";

        document.getElementById('passwordError').textContent = '* Incorrect password';
        document.getElementById('password').classList.add('error');
        passwordError.className = "error";
      }
    })

    .catch(error => {
      console.error("Fetch operation problem: " + error);
    })
}

function clearErrors() {
    document.getElementById('emailError').textContent = '';
    document.getElementById('emailError').classList.remove('error');

    document.getElementById('passwordError').textContent = '';
    document.getElementById('passwordError').classList.remove('error');

    document.getElementById('email').classList.remove('error');
    document.getElementById('password').classList.remove('error');
}