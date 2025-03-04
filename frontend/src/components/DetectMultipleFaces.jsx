import { useEffect, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";

const DetectMultipleFaces = ({ videoElement }) => {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const detectFaces = async () => {
      if (!videoElement) return;

      const model = await blazeface.load();

      const interval = setInterval(async () => {
        const predictions = await model.estimateFaces(videoElement, false);
        if (predictions.length >= 2) {
          setWarning(true);
          alert("⚠️ Two or more faces detected! Auto-submitting...");
          clearInterval(interval);
          setTimeout(() => {
            navigate("/submit");
          }, 3000);
        }
      }, 2000);
    };

    detectFaces();
  }, [videoElement, navigate]);

  return warning ? <p style={{ color: "red" }}>⚠️ Multiple faces detected!</p> : null;
};

export default DetectMultipleFaces;
