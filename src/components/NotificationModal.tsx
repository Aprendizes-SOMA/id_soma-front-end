import React from "react";
import styles from "@/styles/NotificationModal.module.css";

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${type === "error" ? styles.error : styles.success}`}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

export default NotificationModal;
