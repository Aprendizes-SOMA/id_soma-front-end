import { ConfirmationModalProps } from "@/interfaces/Modal.types";
import styles from "../styles/Modal.module.css";
import CustomButton from "@/components/CustomButton";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalConfirmationContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <CustomButton text={"Cancelar"} onClick={onClose} color={"danger"} />
          <CustomButton text={"Confirmar"} onClick={onConfirm} color={"primary"} />
        </div>
      </div>
    </div>
  );
}
