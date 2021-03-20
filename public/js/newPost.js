async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#newPostTitle").value;
  const text = document.querySelector("#newPostText").value;

  const response = await fetch(`/api/posts`, {
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
    document.location.replace("/dashboard");
  }
}

document
  .querySelector("#newPostForm")
  .addEventListener("submit", newPostHandler);
