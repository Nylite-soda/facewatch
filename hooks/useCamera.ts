import { useState, useEffect, useCallback } from "react";

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCameraStream = useCallback(async () => {
    setError(null); // Clear previous errors
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Camera access was denied. Please enable it in your browser settings and try again."
      );
    }
  }, []);

  // Attempt to get the camera stream automatically on initial load.
  useEffect(() => {
    getCameraStream();
  }, [getCameraStream]);

  // Cleanup function to stop the stream when the component unmounts.
  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return { stream, error, getCameraStream };
}
