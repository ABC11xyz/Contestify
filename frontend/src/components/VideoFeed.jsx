import { useEffect, useRef } from "react";

const VideoFeed = ({ onStreamReady }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        onStreamReady(videoRef.current);
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onStreamReady]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      draggable="true"
      style={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        cursor: "grab",
        width: "150px",
        height: "120px",
        border: "2px solid black",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    ></video>
  );
};

export default VideoFeed;
