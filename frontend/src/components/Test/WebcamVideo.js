import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

export default function WebcamRecorder({ onSaveToLocalStorage, testEnded }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

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
      stopRecording(); // Ensure recording stops when component unmounts
    };
  }, []);

  // Stop recording when the test ends
  useEffect(() => {
    if (testEnded) {
      stopRecording();
    }
  }, [testEnded]);

  // Stop recording and save the video
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stopRecording(() => {
        const blob = mediaRecorderRef.current.getBlob();
        saveVideoToLocalStorage(blob); // Save video to localStorage
        sendDownloadableLinkToAdmin(blob); // Send to admin
        const stream = mediaRecorderRef.current.stream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop()); // Stop webcam
        }
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

  // Send video to admin as a downloadable link
  const sendDownloadableLinkToAdmin = (videoBlob) => {
    const videoURL = URL.createObjectURL(videoBlob);

    // Send video link to admin via API or email service
    fetch("/api/send-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoURL,
        adminEmail: "admin@example.com", // Replace with admin email
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Admin notified successfully:", data);
      })
      .catch((error) => {
        console.error("Error notifying admin:", error);
      });
  };

  return (
   
    <div
      className="webcam-recorder">
      {/* Webcam feed with reduced size */}
      <Webcam
        ref={webcamRef}
        audio
        mirrored
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          // height: "120px",
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
