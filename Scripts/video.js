function playVideo(VideoEntity, ThumbnailEntity, VideoAsset) {
    ThumbnailEntity.setAttribute("visible", false);
    ThumbnailEntity.className = "";
    VideoEntity.setAttribute("visible", true);
    VideoEntity.className = "clickable";
    VideoAsset.play();
}

function pauseVideo(VideoEntity, ThumbnailEntity, VideoAsset) {
    VideoAsset.pause();
    VideoEntity.setAttribute("visible", false);
    VideoEntity.className = "";
    ThumbnailEntity.setAttribute("visible", true);
    ThumbnailEntity.className = "clickable";
}

const videoTarget = document.querySelector('#TargetVideo');
const videoThumbnailEntity = document.querySelector('#VideoThumbnailEntity');
const videoEntity = document.querySelector('#VideoEntity');
const videoAsset = document.querySelector('#VideoAsset');

let isPlaying = false;
let wasPlaying = false;

videoThumbnailEntity.addEventListener("click", event => {
    playVideo(videoEntity, videoThumbnailEntity, videoAsset);
    isPlaying = true;
});
videoEntity.addEventListener("click", event => {
    pauseVideo(videoEntity, videoThumbnailEntity, videoAsset);
    isPlaying = false;
});
videoTarget.addEventListener("targetFound", event => {
    if (wasPlaying){
        playVideo(videoEntity, videoThumbnailEntity, videoAsset);
    }
});
videoTarget.addEventListener("targetLost", event => {
    if (isPlaying){
        pauseVideo(videoEntity, videoThumbnailEntity, videoAsset);
        wasPlaying = true;
    }else{
        wasPlaying = false;
    }
});