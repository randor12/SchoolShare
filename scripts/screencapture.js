// JavaScript source code
// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
// https://github.com/webrtcHacks/adapter
// Simplily a possiblity for the screen capture, will need to do a npm install 
// npm install webrtc-adapter
import adapter from 'webrtc-adapter';
async function startCapture(/*gdmOptions*/) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
  } catch(err) {
    console.error("Error: " + err);
  }
  return captureStream;
}

//constants passed into get media display
const gdmOptions = {
  video: {
    cursor: "never" // never display cursor
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}