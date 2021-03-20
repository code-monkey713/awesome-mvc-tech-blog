async function signUpHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#signUpName").value;
  const email = document.querySelector("#signUpEmail").value;
  const password = document.querySelector("#signUpPassword").value;
  const matchPassword = document.querySelector("#matchPassword").value;

  if (name && email && password) {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}

async function loginHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  if (email && password) {
    const response = await fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}

async function logoutHandler(event) {
  const response = await fetch("/api/userRoutes/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  }
}

document.querySelector("#logout").addEventListener("click", logout);

async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#newPostTitle").value;
  const text = document.querySelector("#newPostText").value;

  const response = await fetch(`/api/postRoutes`, {
    method: "POST",
    body: JSON.stringify({
      title,
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  }
}

document.querySelector("#signUpForm").addEventListener("submit", signUpHandler);
document.querySelector("#loginForm").addEventListener("submit", loginHandler);
document
  .querySelector("#newPostBtn")
  .addEventListener("submit", newPostHandler);
