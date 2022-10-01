let pageNumberList = new Array();
const postContainerNumber =
  document.getElementsByClassName("post-container").length;

const containerIds = document.querySelectorAll(".container");
containerIds.forEach((containerId) => {
  const tempId = containerId.id;
  let processedId = tempId.replace("Container", "");

  let data = new Object();

  data.id = processedId;
  data.pageNumber = 0;

  pageNumberList.push(data);
});

const buttonLefts = document.querySelectorAll(".btnLeft");
const buttonRights = document.querySelectorAll(".btnRight");

let pageNumber = 0;
let targetListNumber = 0;

const handleLeftClick = (event) => {
  const id = event.target.parentNode.id;
  let parsedId = id.replace("LeftBtn", "");

  const photoContainerId = `${parsedId}Container`;
  const photoContainer = document.getElementById(photoContainerId);
  const photoContainerLength =
    photoContainer.getElementsByTagName("img").length;

  for (let i = 0; i < postContainerNumber; i++) {
    if (parsedId === pageNumberList[i].id) {
      pageNumber = pageNumberList[i].pageNumber;
      targetListNumber = i;
    }
  }
  const pixelLeftVar = 470 * (pageNumber - 1);
  photoContainer.style.transform = `translate(-${pixelLeftVar}px)`;
  if (pageNumber === 0) {
    pageNumber = 0;
  } else {
    pageNumber = pageNumber - 1;
  }
  pageNumberList[targetListNumber].pageNumber = pageNumber;
};

const handleRightClick = (event) => {
  const id = event.target.parentNode.id;
  let parsedId = id.replace("RightBtn", "");

  const photoContainerId = `${parsedId}Container`;
  const photoContainer = document.getElementById(photoContainerId);
  const photoContainerLength =
    photoContainer.getElementsByTagName("img").length;

  for (let i = 0; i < postContainerNumber; i++) {
    if (parsedId === pageNumberList[i].id) {
      pageNumber = pageNumberList[i].pageNumber;
      targetListNumber = i;
    }
  }

  const pixelRightVar = 470 * (pageNumber + 1);
  if (pageNumber === photoContainerLength - 1) {
    pageNumber = photoContainerLength - 1;
  } else {
    photoContainer.style.transform = `translate(-${pixelRightVar}px)`;
    pageNumber = pageNumber + 1;
  }
  pageNumberList[targetListNumber].pageNumber = pageNumber;
};

buttonLefts.forEach((buttonLeft) => {
  buttonLeft.addEventListener("click", handleLeftClick);
});
buttonRights.forEach((buttonRight) => {
  buttonRight.addEventListener("click", handleRightClick);
});
