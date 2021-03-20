async function deletePostHandler() {
  const id = document.querySelector("#bId").textContent;

  const response = await fetch(`/api/posts/:id`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  }
}

async function editPostHandler() {
  const id = document.querySelector("#bId").textContent;
  const updatedText = document.querySelector("#editModalText").value;

  const response = await fetch(`/api/posts/:id`, {
    method: "PUT",
    body: JSON.stringify({
      text: updatedText,
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  }
}

async function saveCommentHandler() {
  const comment_text = document.querySelector("#modalCommentText").value;
  const post_id = parseInt(document.querySelector("#bId").textContent);

  const response = await fetch(`/api/comments/`, {
    method: "POST",
    body: JSON.stringify({
      comment_text,
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    location.reload();
    document.querySelector("#modalCommentText").value = "";
  }
}

document
  .querySelector("#saveEditBtn")
  .addEventListener("click", editPostHandler);

document
  .querySelector("#deleteBtn")
  .addEventListener("click", deletePostHandler);

document
  .querySelector("#saveCommentBtn")
  .addEventListener("click", saveCommentHandler);
