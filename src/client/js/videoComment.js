const commentContainer = document.querySelector(".comment");

const commentSubmitBtn = document.querySelector(".comment-submit");
const commentContent = document.querySelector(".content-comment");
const deleteBtns = document.querySelectorAll(".comment-delete");
const videoContainer = document.querySelector(".video");

const clickSubmit = async () => {
  const content = commentContent.value;
  if (content === "") {
    console.log("no content");
  } else {
    commentContent.value = "";
    const response = await fetch(
      `/api/${videoContainer.dataset.id}/comment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    );
    if (response.status === 201) {
      location.href = location.href;
    }
  }
};

const handleDeleteBtn = async (event) => {
  const videoId = videoContainer.dataset.id;
  const targetComment =
    event.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
  const response = await fetch(`/api/${videoId}/comment/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetComment,
    }),
  });
  const li = event.srcElement.parentNode.parentNode.parentNode.parentNode;
  li.remove();
};

commentSubmitBtn.addEventListener("click", clickSubmit);
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", handleDeleteBtn);
});
