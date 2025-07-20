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
  Button,
  Alert,
} from "@mantine/core";
import { IconAlertCircle, IconVideo } from "@tabler/icons-react";
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

  const { stream, error: cameraError, getCameraStream } = useCamera();
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

  const isLoading = !modelsLoaded && !cameraError;
  const showVideoFeed = stream && modelsLoaded;

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
            {isLoading && (
              <Center h={400}>
                <Stack align="center">
                  <Loader />
                  <Text>Loading models...</Text>
                </Stack>
              </Center>
            )}

            {cameraError && (
              <Center h={400}>
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Camera Error"
                  color="red"
                  variant="light"
                >
                  <Stack>
                    <Text>{cameraError}</Text>
                    <Button onClick={getCameraStream} variant="outline">
                      Try Again
                    </Button>
                  </Stack>
                </Alert>
              </Center>
            )}

            {!isLoading && !cameraError && !stream && (
              <Center h={400}>
                <Stack align="center">
                  <Text>Camera is not connected.</Text>
                  <Button
                    onClick={getCameraStream}
                    leftSection={<IconVideo size={16} />}
                  >
                    Connect Camera
                  </Button>
                </Stack>
              </Center>
            )}

            {showVideoFeed && (
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
            disabled={!showVideoFeed}
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
