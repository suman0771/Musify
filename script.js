console.log("Welcome to Musify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/Saari.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
  {
    songName: "Saari Raat",
    filePath: "songs/Saari.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Chu Gon Do",
    filePath: "songs/Chu Gon Do.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Luna",
    filePath: "songs/Luna.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Saada Pyar",
    filePath: "songs/Saada Pyar.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Saada Pyar",
    filePath: "songs/Saada Pyar.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Saada Pyar",
    filePath: "songs/Saada Pyar.mp3",
    coverPath: "covers/1.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    document.getElementById("masterSongName").innerText = "Song Name";
  }
});

//listen to events
audioElement.addEventListener("timeupdate", () => {
  // console.log("timeupdate");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(progress);
  myProgressBar.value = progress;
  //added
  if (audioElement.ended) {
    songIndex = (songIndex + 1) % 4;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  }
});

//seekbar progress
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// document.addEventListener("time");

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target);
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      // audioElement.src = "songs/${songIndex}.mp3";
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementsById("next")=addEventListener("click", () => {
  if (songIndex == 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  // if (songIndex >= 7) {
  //   songIndex = 0;
  // } else {
  //   songIndex += 1;
  // }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementsById("previous")=addEventListener("click", () => {
  songIndex = (songIndex + 1) % 4;
  // if (songIndex <= 0) {
  //   songIndex = 0;
  // } else {
  //   songIndex -= 1;
  // }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
