import { DeleteModalProps } from "@/interfaces/ModalProps";
import styles from "../styles/components/ModalDe.module.css";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  children,
  title,
  message,
}: DeleteModalProps) {
  return (
    <div className={`${styles.modal} ${isOpen ? styles["is-active"] : ""}`}>
      <div
            className={styles["modal-background"]}
            onClick={onClose}
        ></div>
      <div className={styles["modal-card"]}>
                <header className={styles["modal-card-head"]}>
                    <p>{title}</p>
                </header>
                <section className={styles["modal-card-body"]}>
                    <p>{message}</p>
                    {children}
                </section>
                <footer className={styles["modal-card-foot"]}>
                    <button
                        className={`${styles.button} ${styles["is-danger"]}`}
                        onClick={onDelete}
                    >
                    Excluir
                </button>
                <button
                    className={`${styles.button} ${styles.cancel}`}
                    onClick={onClose}
                >
                Cancelar
            </button>
        </footer>
      </div>
    </div>
    );
}