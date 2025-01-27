"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/components/Modal.module.css";

interface ModalCollaboratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; cpf: string; role: string }) => void;
  title: string;
  initialData?: { name: string; cpf: string; role: string };
}

const ModalCollaborator: React.FC<ModalCollaboratorProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialData = { name: "", cpf: "", role: "" },
}) => {
  const [formData, setFormData] = useState(initialData);

  // Reset do formulário ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setFormData(title === "Adicionar Colaborador" ? { name: "Informe seu nome:", cpf: "Informe seu CPF:", role: "Informe seu cargo:" } : initialData);
    }
  }, [isOpen, title, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <form className={styles.form}>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className={styles.input}
          />
          <label>Cargo:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
          />
        </form>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.saveButton} onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCollaborator;
