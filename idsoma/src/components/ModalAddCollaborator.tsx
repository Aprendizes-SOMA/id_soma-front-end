"use client";

import React, { useState } from "react";
import styles from "../styles/components/ModalAdd.module.css";

interface ModalAddCollaboratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; cpf: string; role: string }) => void;
}

const ModalAddCollaborator: React.FC<ModalAddCollaboratorProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({ name: "", cpf: "", role: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData); // Envia os dados para o componente pai
    setFormData({ name: "", cpf: "", role: "" }); // Reseta o formulário
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Adicionar Colaborador</h2>
        <div className={styles.modalLine}></div> {/* Linha abaixo do título */}
        <form className={styles.form}>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite o nome"
          />
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite o CPF"
          />
          <label>Cargo:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite o cargo"
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

export default ModalAddCollaborator;
