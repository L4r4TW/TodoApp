//selectors
const registerForm = document.querySelector('.register-form');
const submitButton = document.querySelector('.submit-button');
// const result = document.querySelector('#result');

//event listeners
submitButton.addEventListener('click', registerUser )

//functions
function registerDisable() {
    if (inputTextField.value.trim() === '' || inputPasswordField.value.trim() === '' ) {
      submitButton.disabled = true;
      submitButton.style.opacity = 0.5;
    } else {
      submitButton.disabled = false;
      submitButton.style.opacity = 1;
    }
}

function registerUser(event){
    event.preventDefault();

    const form = new FormData(registerForm); 
    const data = Object.fromEntries(form.entries());

    fetch('/registerUser/', {
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
        } else {
            alert('Registration error occured');
        }
    });
}