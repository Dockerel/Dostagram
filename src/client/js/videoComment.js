const commentSubmitBtn = document.querySelector(".comment-submit");
const commentContent = document.querySelector(".content-comment");
const deleteBtns = document.querySelectorAll(".comment-delete");
const videoContainer = document.querySelector(".video");

const addComment = (content) => {
  const commentObDiv = document.createElement("div");
  const commentColumnDiv = document.createElement("div");
  const commentImage = document.createElement("img");
  const commentInfoDiv = document.createElement("div");
  const commentUsername = document.createElement("span");
  const commentContent = document.createElement("span");

  commentObDiv.className = "comment-object";
  commentColumnDiv.className = "comment-column";
  commentImage.src = "`/${comment.owner.avatarUrl}`";
  commentInfoDiv.className = "comment-info";
  commentUsername.className = "";
};

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
  console.log("clicked");
  const videoId = videoContainer.dataset.id;
  const targetComment = event.path[4].dataset.id;
  const response = await fetch(`/api/${videoId}/comment/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetComment,
    }),
  });
  if (response.status === 201) {
    location.href = location.href;
  } else {
    location.href = location.href;
  }
};

commentSubmitBtn.addEventListener("click", clickSubmit);
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", handleDeleteBtn);
});
