import { useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";

const DetectMobileCamera = ({ videoElement }) => {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const detectMobile = async () => {
      if (!videoElement) return;

      const model = await cocoSsd.load();

      const interval = setInterval(async () => {
        const predictions = await model.detect(videoElement);
        const mobileDetected = predictions.some(
          (pred) => pred.class === "cell phone" || pred.class === "tablet"
        );

        if (mobileDetected) {
          setWarning(true);
          alert("⚠️ Mobile detected! Auto-submitting...");
          clearInterval(interval);
          setTimeout(() => {
            navigate("/submit");
          }, 3000);
        }
      }, 2000);
    };

    detectMobile();
  }, [videoElement, navigate]);

  return warning ? <p style={{ color: "red" }}>⚠️ Mobile detected!</p> : null;
};

export default DetectMobileCamera;
