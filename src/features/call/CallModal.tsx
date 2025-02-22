import { Modal, Text } from "@mantine/core";

function CallModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal opened={isOpen} onClose={onClose} title="WebRTC Call">
      <Text>This feature is currently under construction...</Text>
    </Modal>
  );
}

export default CallModal;
