interface ModalImportCSVProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, type: string) => void;
}