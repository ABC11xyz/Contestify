import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";

const DetectMobileCamera = () => {
  const videoRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;

        // Load AI Model
        const model = await cocoSsd.load();
        detectMobile(model);
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    const detectMobile = async (model) => {
      const interval = setInterval(async () => {
        const predictions = await model.detect(videoRef.current);

        const mobileDetected = predictions.some(
          (pred) => pred.class === "cell phone" || pred.class === "tablet"
        );

        if (mobileDetected) {
          setWarning(true);
          alert("⚠️ Mobile detected! You will be auto-submitted.");
          clearInterval(interval);
          setTimeout(() => {
            navigate("/submit");
          }, 3000);
        }
      }, 2000); 
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [navigate]);

  return (
    <div>
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
      {warning && <p style={{ color: "red" }}>⚠️ Mobile detected!</p>}
    </div>
  );
};

export default DetectMobileCamera;

// import { useEffect, useRef, useState } from "react";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import * as blazeface from "@tensorflow-models/blazeface";
// import "@tensorflow/tfjs";
// import { useNavigate } from "react-router-dom";

// const DetectMobileAndFaces = () => {
//   const videoRef = useRef(null);
//   const [warning, setWarning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         videoRef.current.srcObject = stream;

//         // Load AI Models
//         const cocoModel = await cocoSsd.load();
//         const faceModel = await blazeface.load();

//         detectObjectsAndFaces(cocoModel, faceModel);
//       } catch (err) {
//         console.error("Camera access denied:", err);
//       }
//     };

//     const detectObjectsAndFaces = async (cocoModel, faceModel) => {
//       const interval = setInterval(async () => {
//         const cocoPredictions = await cocoModel.detect(videoRef.current);
//         const facePredictions = await faceModel.estimateFaces(videoRef.current, false);

//         // Check for mobile phones
//         const mobileDetected = cocoPredictions.some(
//           (pred) => pred.class === "cell phone" || pred.class === "tablet"
//         );

//         // Check for multiple faces
//         const multipleFacesDetected = facePredictions.length >= 2;

//         if (mobileDetected || multipleFacesDetected) {
//           setWarning(true);
//           alert("⚠️ Mobile or multiple faces detected! Auto-submitting...");
//           clearInterval(interval);
//           setTimeout(() => {
//             navigate("/submit");
//           }, 3000);
//         }
//       }, 2000); // Check every 2 seconds
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [navigate]);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         draggable="true"
//         style={{
//           position: "fixed",
//           bottom: "10px",
//           left: "10px",
//           cursor: "grab",
//           width: "150px",
//           height: "120px",
//           border: "2px solid black",
//           borderRadius: "10px",
//           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
//         }}
//       ></video>
//       {warning && <p style={{ color: "red" }}>⚠️ Mobile or multiple faces detected!</p>}
//     </div>
//   );
// };

// export default DetectMobileAndFaces;
