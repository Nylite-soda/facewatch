"use client";

import { useEffect } from "react";
import * as faceapi from "face-api.js";

interface FaceTrackerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  stream: MediaStream | null;
}

export function FaceTracker({ videoRef, canvasRef, stream }: FaceTrackerProps) {
  // This effect handles the entire lifecycle of the face tracking feature.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !stream) {
      return;
    }

    video.srcObject = stream;
    video.play().catch(console.error);

    const onReady = () => {
      // Set canvas dimensions precisely to match the video.
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const interval = setInterval(async () => {
        // Ensure the video is ready before trying to draw.
        if (video.readyState < 3) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw the video frame onto the canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Detect faces and draw the results.
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        );
        const resized = faceapi.resizeResults(detections, {
          width: canvas.width,
          height: canvas.height,
        });
        faceapi.draw.drawDetections(canvas, resized);
      }, 100);

      // Return a cleanup function that stops the detection interval.
      return () => clearInterval(interval);
    };

    let cleanup: (() => void) | undefined;
    const handleReady = () => {
      cleanup = onReady();
    };

    video.addEventListener("loadedmetadata", handleReady);

    // Main cleanup for the effect.
    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      if (cleanup) {
        cleanup();
      }
    };
  }, [stream, videoRef, canvasRef]);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
}
