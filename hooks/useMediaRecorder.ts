import { useState, useRef } from "react";
import { saveVideoToLocalStorage } from "@/lib/videoUtils";

export function useMediaRecorder(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = () => {
    if (!canvasRef.current) return;

    const canvasStream = canvasRef.current.captureStream(30);
    const recorder = new MediaRecorder(canvasStream, {
      mimeType: "video/webm",
    });
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      try {
        const url = await saveVideoToLocalStorage(blob);
        setRecordedUrl(url);
      } catch {}
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return {
    isRecording,
    recordedUrl,
    setRecordedUrl,
    startRecording,
    stopRecording,
  };
}
