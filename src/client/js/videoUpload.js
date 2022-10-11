const video = document.querySelector("video");
const playBtn = document.querySelector(".fa-pause");
const muteBtn = document.querySelector(".mute-btn");
const muteIcon = document.querySelector(".fa-volume-off");
const timeline = document.querySelector(".timeline-input");

let fullTime;

const handleMouseDown = () => {
  video.pause();
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
};
const handleMouseUp = () => {
  video.play();
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
};

const handleMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
  } else if (!video.muted) {
    video.muted = true;
  }
  muteIcon.classList.remove(video.muted ? "fa-volume-off" : "fa-volume-xmark");
  muteIcon.classList.add(video.muted ? "fa-volume-xmark" : "fa-volume-off");
};

const handleVideoLoaded = () => {
  if (!isNaN(video.duration)) {
    fullTime = video.duration;
  }
};

const handleVideoTimeupdate = () => {
  timeline.value = (video.currentTime * 100) / fullTime;
  if (video.currentTime === fullTime) {
    timeline.value = 0;
    video.currentTime = 0;
  }
};

video.addEventListener("canplay", handleVideoLoaded);
handleVideoLoaded();
video.addEventListener("timeupdate", handleVideoTimeupdate);

video.addEventListener("mousedown", handleMouseDown);
video.addEventListener("mouseup", handleMouseUp);
muteBtn.addEventListener("click", handleMuteBtn);
