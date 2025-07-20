"use client";

import { useRef, useEffect } from "react";
import {
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Center,
  Loader,
  Box,
} from "@mantine/core";
import { useCamera } from "@/hooks/useCamera";
import { useFaceApi } from "@/hooks/useFaceApi";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useIsClient } from "@/hooks/useIsClient";
import {
  loadVideoFromLocalStorage,
  deleteVideoFromLocalStorage,
} from "@/lib/videoUtils";
import { FaceTracker } from "@/components/FaceTracker";
import { RecordingControls } from "@/components/RecordingControls";
import { RecordedVideo } from "@/components/RecordedVideo";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stream = useCamera();
  const modelsLoaded = useFaceApi();
  const {
    isRecording,
    recordedUrl,
    setRecordedUrl,
    startRecording,
    stopRecording,
  } = useMediaRecorder(canvasRef);

  const isClient = useIsClient();

  useEffect(() => {
    const savedVideo = loadVideoFromLocalStorage();
    if (savedVideo) {
      setRecordedUrl(savedVideo);
    }
  }, [setRecordedUrl]);

  const handleDeleteVideo = () => {
    deleteVideoFromLocalStorage();
    setRecordedUrl(null);
  };

  const isLoading = !stream || !modelsLoaded;

  return (
    <Box mih="100vh">
      <Container size="md" py="xl">
        <Stack align="center" gap="xl">
          <Stack align="center" gap={0}>
            <Title order={1}>FaceWatch</Title>
            <Text c="dimmed">Live Face Tracking & Video Recording</Text>
          </Stack>

          <Paper
            withBorder
            shadow="md"
            radius="lg"
            className="w-full md:w-[80%]"
            p="sm"
          >
            {isLoading ? (
              <Center h={400}>
                <Stack align="center">
                  <Loader />
                  <Text>Loading models and accessing camera...</Text>
                </Stack>
              </Center>
            ) : (
              <FaceTracker
                videoRef={videoRef}
                canvasRef={canvasRef}
                stream={stream}
              />
            )}
          </Paper>

          <RecordingControls
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
          />

          {isClient && recordedUrl && (
            <RecordedVideo
              videoUrl={recordedUrl}
              onDelete={handleDeleteVideo}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
