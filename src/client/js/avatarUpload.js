const fileSelectBtn = document.querySelector(".fileSelectBtn");
const fileName = document.querySelector(".filename");
const hiddenFileSelectBtn = document.querySelector(".hiddenBtn");

const handleFileChange = (event) => {
  const targetNb = event.target.files.length;
  fileName.value = `${targetNb} file selected`;
};

hiddenFileSelectBtn.addEventListener("change", handleFileChange);
