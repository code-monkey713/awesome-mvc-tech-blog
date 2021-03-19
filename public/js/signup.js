async function signupHandler(e){
  e.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // console.log(`name:${name} / email:${email} / password:${password}`);

  if (name && email && password){
    
  }

}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);