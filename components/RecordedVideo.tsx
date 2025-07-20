import { Paper, Stack, Title, Button, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface RecordedVideoProps {
  videoUrl: string;
  onDelete: () => void;
}

export function RecordedVideo({ videoUrl, onDelete }: RecordedVideoProps) {
  return (
    <Paper withBorder radius="md" p="md" className="w-full md:w-[80%]">
      <Stack>
        <Group justify="space-between">
          <Title order={4}>Recorded Video</Title>
          <Button
            variant="light"
            color="red"
            size="xs"
            leftSection={<IconTrash size={14} />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Group>
        <video src={videoUrl} controls className="w-full rounded" />
      </Stack>
    </Paper>
  );
}
