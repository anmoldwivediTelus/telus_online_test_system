import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

export default function WebcamRecorder({ onSaveToLocalStorage }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const recordedChunks = useRef([]);

  // Start recording automatically when the component mounts
  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
          webcamRef.current.play();
        }

        mediaRecorderRef.current = RecordRTC(stream, { type: "video" });
        mediaRecorderRef.current.startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startRecording();

    return () => {
      stopRecording(); // Stop recording when the component unmounts
    };
  }, []);

  // Stop recording and save the video
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stopRecording(() => {
        const blob = mediaRecorderRef.current.getBlob();
        saveVideoToLocalStorage(blob); // Save video to localStorage
        mediaRecorderRef.current.stream.stop(); // Stop the webcam stream
        setIsRecording(false);
      });
    }
  };

  // Save video to localStorage as base64 string
  const saveVideoToLocalStorage = (videoBlob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      localStorage.setItem("webcamVideo", base64data);
      if (onSaveToLocalStorage) onSaveToLocalStorage(base64data); // Notify parent
    };
    reader.readAsDataURL(videoBlob);
  };

  return (
    <div
      className="webcam-recorder"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Webcam feed with reduced size */}
      <Webcam
        ref={webcamRef}
        audio
        mirrored
        style={{
          width: "150px", // Adjust width
          height: "150px", // Adjust height
          borderRadius: "10px", // Optional: Rounded corners
          border: "2px solid #ccc", // Optional: Border styling
        }}
      />

      {/* Recording indicator */}
      {isRecording && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          Recording...
        </div>
      )}
    </div>
  );
}
