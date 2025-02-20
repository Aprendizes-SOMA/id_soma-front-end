import { ReactNode } from "react";

export interface DeleteModalProps { 
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  children?: ReactNode;
  title : string;
  message : string;
}
