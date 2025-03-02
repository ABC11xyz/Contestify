// import React, { useEffect, useRef } from "react";
// import * as faceapi from "face-api";
// import { useNavigate } from "react-router-dom";

// const FaceDetection = () => {
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//     };

//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error("Error accessing webcam:", err));
//     };

//     loadModels().then(startVideo);
//   }, []);

//   useEffect(() => {
//     const detectFaces = async () => {
//       if (videoRef.current) {
//         const detections = await faceapi.detectAllFaces(
//           videoRef.current,
//           new faceapi.TinyFaceDetectorOptions()
//         );

//         if (detections.length > 1) {
//           alert("Multiple faces detected! You are disqualified.");
//           navigate("/disqualified");
//         }
//       }
//     };

//     const interval = setInterval(detectFaces, 2000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   return <video ref={videoRef} autoPlay muted className="hidden" />;
// };

// export default FaceDetection;
