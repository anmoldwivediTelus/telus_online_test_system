import React, { useRef, useState } from "react";

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prev) => [...prev, event.data]);
        }
      };
    } catch (error) {
      console.error("Webcam access denied or not supported:", error);
    }
  };

  const startRecording = () => {
    setChunks([]);
    setRecording(true);
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const saveRecording = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test-recording.webm";
    a.click();
    localStorage.setItem("recording", url); // Optional: save URL to local storage
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "200px", height: "150px" }}></video>
      <div>
        <button onClick={startWebcam}>Start Webcam</button>
        {recording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
        <button onClick={saveRecording} disabled={recording}>
          Save Recording
        </button>
      </div>
    </div>
  );
};

export default WebcamComponent;
