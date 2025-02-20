interface NotificationModalProps {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}