import { useState, useEffect } from "react";

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Could not access the camera. Please check permissions.");
      }
    }
    setupCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return stream;
}
