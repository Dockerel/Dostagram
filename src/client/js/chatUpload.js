const chatScreen = document.querySelector(".chat-screen");
const chatBtn = document.querySelector(".chat-submit-button");

const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector(".chat-input");

const addChat = (text) => {
  const chatDiv = document.createElement("div");
  const chatAnchor = document.createElement("a");
  const chatImage = document.createElement("img");
  const chatSpan = document.createElement("span");

  chatDiv.className = "my-chat";
  chatImage.className = "chat-profileImage";
  chatSpan.className = "chat-content";
  chatSpan.innerText = text;

  chatScreen.appendChild(chatDiv);
  chatDiv.appendChild(chatAnchor);
  chatAnchor.appendChild(chatImage);
  chatAnchor.appendChild(chatSpan);
  chatScreen.scrollTop = chatScreen.scrollHeight;
};

const handleChatBtnClick = async (event) => {
  event.preventDefault();
  const text = chatInput.value;
  if (text === "") {
    console.log("no content");
  } else {
    const response = await fetch("/api/chat/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    if (response.status === 201) {
      chatInput.value = "";
      addChat(text);
    }
  }
};

if (chatForm) {
  chatBtn.addEventListener("click", handleChatBtnClick);
}
chatScreen.scrollTop = chatScreen.scrollHeight;
