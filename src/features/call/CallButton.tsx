import { Button } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";

function CallButton({ open }: { open: () => void }) {
  return (
    <Button
      aria-label="Call"
      pos="fixed"
      bottom={20}
      right={20}
      color="green"
      radius="xl"
      size="lg"
      onClick={open}
    >
      <IconPhone />
    </Button>
  );
}

export default CallButton;
