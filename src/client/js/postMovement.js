const buttonLefts = document.querySelectorAll(".btnLeft");
const buttonRights = document.querySelectorAll(".btnRight");
const photoContainer = document.querySelectorAll(".container");
let pageNumber = [];
let objectNumber;

const handleLeftClick = (objectNumber) => {
  const pixelLeftVar = 350 * (pageNumber[objectNumber] - 1);
  photoContainer[
    objectNumber
  ].style.transform = `translate(-${pixelLeftVar}px)`;
  if (pageNumber[objectNumber] === 1) {
    pageNumber[objectNumber] = 1;
  } else {
    pageNumber[objectNumber] = pageNumber[objectNumber] - 1;
  }
};

function handleRightClick(objectNumber) {
  const pixelRightVar = 350 * pageNumber[objectNumber];
  photoContainer[
    objectNumber
  ].style.transform = `translate(-${pixelRightVar}px)`;
  if (pageNumber[objectNumber] === photoContainer[objectNumber].length - 1) {
    pageNumber[objectNumber] = photoContainer[objectNumber].length - 1;
  } else {
    pageNumber[objectNumber] = pageNumber[objectNumber] + 1;
  }
}

// for (const buttonLeft of buttonLefts) {
//   buttonLeft.addEventListener("click", handleLeftClick);
// }
// for (const buttonRight of buttonRights) {
//   buttonRight.addEventListener("click", handleRightClick);
// }

for (var i = 0; i < photoContainer.length; i++) {
  pageNumber.push(1);
}
console.log(pageNumber);

for (var i = 0; i < buttonLefts.length; i++) {
  let hiddenNb = i;
  //   buttonLefts[i].addEventListener("click", handleLeftClick(i));
  buttonLefts[i].addEventListener("click", console.log("pass"));
}

for (var i = 0; i < buttonRights.length; i++) {
  buttonRights[i].addEventListener("click", handleRightClick(i));
}
