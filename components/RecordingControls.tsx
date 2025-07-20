import { Button, Group, Indicator } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

interface RecordingControlsProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export function RecordingControls({
  isRecording,
  onStart,
  onStop,
  disabled,
}: RecordingControlsProps) {
  return (
    <Group>
      <Button
        leftSection={<IconPlayerPlay size={16} />}
        onClick={onStart}
        disabled={isRecording || disabled}
        variant="light"
        color="green"
      >
        Start Recording
      </Button>

      <Indicator
        color="red"
        processing
        disabled={!isRecording}
        position="middle-end"
        size={12}
        withBorder
      >
        <Button
          leftSection={<IconPlayerStop size={16} />}
          onClick={onStop}
          disabled={!isRecording || disabled}
          variant="light"
          color="red"
        >
          Stop Recording
        </Button>
      </Indicator>
    </Group>
  );
}
