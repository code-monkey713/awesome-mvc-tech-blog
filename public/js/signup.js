// const { response } = require("express");

async function signupHandler(e){
  e.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // console.log(`name:${name} / email:${email} / password:${password}`);

  if (name && email && password){
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok){
      console.log('It was created successful.');
      document.location.replace('/dashboard');
    } else {
      console.log(res.statusText);
    }
  }

}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);