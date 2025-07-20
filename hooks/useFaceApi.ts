import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

export function useFaceApi() {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };
    loadModels();
  }, []);

  return modelsLoaded;
}
