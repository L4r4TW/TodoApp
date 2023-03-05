//selectors

const inputTextField = document.querySelector('.input-text');
const inputPasswordField = document.querySelector('.input-password');
const submitButton = document.querySelector('.submit-button');
const loginForm = document.querySelector('.login-form');


//event listeners
inputTextField.addEventListener('input', loginDisable)
inputPasswordField.addEventListener('input', loginDisable)
submitButton.addEventListener('click', loginUser )


//functions

function loginDisable() {
    if (inputTextField.value.trim() === '' || inputPasswordField.value.trim() === '' ) {
      submitButton.disabled = true;
      submitButton.style.opacity = 0.5;
    } else {
      submitButton.disabled = false;
      submitButton.style.opacity = 1;
    }
}

function loginUser(event) {
    event.preventDefault();
    console.log(event.target);
    
    // console.log(loginForm)
    const form = new FormData(loginForm); 
    const data = Object.fromEntries(form.entries());
    console.log(data);
  
    fetch('/loginUser/', {
        method: 'POST',       
        headers: {
        //   'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            // Redirect to the user's account page
            window.location.href = 'http://127.0.0.1:8000/';
            console.log("siker geci")
        }
        else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while logging in');
      });
}