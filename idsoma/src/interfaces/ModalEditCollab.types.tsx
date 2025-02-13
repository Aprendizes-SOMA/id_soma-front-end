import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; cpf: string; role: string }) => void;
  children?: ReactNode;
}
