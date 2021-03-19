const loginHandler = async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

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
document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);