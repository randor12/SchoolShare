// public/webrtc-handler.js

var video;

function startVideo()
{
    console.log('Video on');

    navigator.mediaDevices.getUserMedia({
        video: {
            mediaSource: "screen",
            width: { max: '1920' },
            height: { max: '1080' },
            frameRate: { max: '60' }
        }
    }).then(gotMedia);
}

function gotMedia(stream) {
    // got the stream  
    video = document.querySelector('video');
    video.srcObject = stream;
    video.play();
}


function stopVideo() {
    video.pause();
    video.srcObject = "";
    video.getTracks()[0].stop();
    console.log('Video Off');
}
