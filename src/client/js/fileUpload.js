const fileSelectBtn = document.querySelector(".fileSelectBtn");
const fileName = document.querySelector(".filename");
const hiddenFileSelectBtn = document.querySelector(".hiddenBtn");

const handleFileChange = (event) => {
  const targetNb = event.target.files.length;
  if (targetNb === 1) {
    fileName.value = `${targetNb} file selected`;
  } else if (targetNb > 1) {
    fileName.value = `${targetNb} files selected`;
  }
};

hiddenFileSelectBtn.addEventListener("change", handleFileChange);
