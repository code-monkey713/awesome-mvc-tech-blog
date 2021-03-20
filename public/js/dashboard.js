async function newPostRedirect() {
  document.location.replace("/new-post");
}

async function deletePostHandler(event) {
  event.preventDefault();
  if (event.target.hasAttribute("id")) {
    const id = event.target.getAttribute("id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}

async function editPostHandler() {}

document
  .querySelector("#newPostBtn")
  .addEventListener("click", newPostRedirect);

document
  .querySelector(".btn-danger")
  .addEventListener("click", deletePostHandler);

document
  .querySelector(".btn-success")
  .addEventListener("click", editPostHandler);
