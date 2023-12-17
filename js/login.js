function validateLogin() {
    clearErrors();

    var email = document.getElementById('email').value;
    var emailError = document.getElementById("emailError");
    var password = document.getElementById('password').value;
    var passwordError = document.getElementById("passwordError");

    if (email !== 'user@example.com' || password !== 'password123') {
      document.getElementById('emailError').textContent = '* Invalid email address';
      document.getElementById('email').classList.add('error');
      emailError.className = "error";

      document.getElementById('passwordError').textContent = '* Incorrect password';
      document.getElementById('password').classList.add('error');
      passwordError.className = "error";
    } 
    else {
      alert('Login successful!');
      window.location.href = 'homepage1.html';
    }
}

function clearErrors() {
    document.getElementById('emailError').textContent = '';
    document.getElementById('emailError').classList.remove('error');

    document.getElementById('passwordError').textContent = '';
    document.getElementById('passwordError').classList.remove('error');

    document.getElementById('email').classList.remove('error');
    document.getElementById('password').classList.remove('error');
}