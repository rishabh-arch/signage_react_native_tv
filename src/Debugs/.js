if (now >= fromDate && now <= toDate) {
  video.src = vidSrc.uri;
  video.play();
} else if (vidSrc.mediaSchedule.disableSchedule == "true") {
  video.src = vidSrc.uri;
  video.play();
} 

let videoLength = 2;
let currentIndex = 0;
document.getElementById("myVideo").setAttribute("src", videoSource[currentIndex].uri);
const videoElement = document.getElementById("myVideo");

document.getElementById("myVideo").addEventListener("ended", playCurrentVideo, false);

function playCurrentVideo(){
    currentIndex = (currentIndex + 1) % videoLength;
    const now = new Date().getTime();
    const disableSchedule = videoSource[currentIndex].mediaSchedule.disableSchedule;
    
    if(disableSchedule=="false"){
        const fromDate = new Date(videoSource[currentIndex].mediaSchedule.fromDate);
        const toDate = new Date(videoSource[currentIndex].mediaSchedule.toDate);
    if (now >= fromDate && now <= toDate) {
        video.src = vidSrc.uri;
        video.play();
    }
    else {
       playCurrentVideo();
        }
    }
    else{
        video.src = vidSrc.uri;
        video.play();
    }
    
}
//latesttttt
function playVideo(videoUrl, loop) {
    video.src = videoUrl;
    video.loop = loop;
    video.play();
  }
  function playCurrentVideo(){
    currentIndex = (currentIndex + 1) % videoSource.length;
    const disableSchedule = videoSource[currentIndex].mediaSchedule.disableSchedule;
    
    if(disableSchedule=="false"){
      const now = new Date();
        const fromDate = new Date(videoSource[currentIndex].mediaSchedule.fromDate);
        const toDate = new Date(videoSource[currentIndex].mediaSchedule.toDate);
    if (now >= fromDate && now <= toDate) {
        video.src = videoSource[currentIndex].uri;
        video.play();
    }
    else {
      videoSource.splice(currentIndex, 1);
      if(videoSource.length<=1){
        document
      .getElementById("myVideo").removeEventListener("ended", playCurrentVideo, false);
      playVideo(videoSource[0].uri, true);
      return;
    }
      video.pause();
       playCurrentVideo();
        }
    }
    else{
      if(videoSource.length<=1){
        document
      .getElementById("myVideo").removeEventListener("ended", playCurrentVideo, false);
      playVideo(videoSource[0].uri, true);
      return;
    }
        video.src = videoSource[currentIndex].uri;
        video.play();
        
    }
    
}


