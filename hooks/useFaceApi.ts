import { useState, useEffect, useCallback } from "react";
import * as faceapi from "face-api.js";

export function useFaceApi() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModels = useCallback(async () => {
    setError(null);
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setModelsLoaded(true);
    } catch (err) {
      console.error("Error loading face-api models:", err);
      setError("Failed to load face detection models. Please check your network connection and try again.");
    }
  }, []);

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  return { modelsLoaded, error, loadModels };
}
