// public/webrtc-handler.js


navigator.mediaDevices.getUserMedia({
    video: {
        mediaSource: "screen",
        width: { max: '1920' },
        height: { max: '1080' },
        frameRate: { max: '60' }
    }
}).then(gotMedia);

function gotMedia(stream) {
    // got the stream  
    var video = document.querySelector('video');
    video.srcObject = stream;
    video.play();
}

const stunServerConfig = {
    iceServers: [{
        url: "localhost:3000/createRoom",
        username: "...",
        credential: "..."
    }]
};


// function gotMedia(stream) {
//     if (initiator) {
//         var peer = new Peer({
//             initiator,
//             stream,
//             config: stunServerConfig
//         });
//     } else {
//         var peer = new Peer({
//             config: stunServerConfig
//         });
//     }
// }

// public/webrtc-handler.js

var initiateBtn = document.getElementById('initiateBtn');
var initiator = false;

initiateBtn.onclick = (e) => {
    initiator = true;
    socket.emit('initiate');
}