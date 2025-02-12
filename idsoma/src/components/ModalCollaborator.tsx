"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/components/Modal.module.css";

interface ModalCollaboratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; cpf: string; role: string }) => Promise<void>;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        title === "Adicionar Colaborador"
          ? { name: "", cpf: "", role: "" }
          : initialData
      );
    }
  }, [isOpen, title, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.cpf.trim() ||
      !formData.role.trim()
    ) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    if (formData.name.length < 3) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return false;
    }

    if (formData.role.length < 2) {
      alert("O cargo deve ter pelo menos 2 caracteres.");
      return false;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(formData.cpf)) {
      alert("CPF inválido. O formato deve ser 000.000.000-00.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar colaborador:", error);
      alert("Erro ao salvar colaborador. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Informe o nome do colaborador"
            disabled={loading}
          />
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className={styles.input}
            placeholder="Informe o CPF do colaborador"
            disabled={loading} // ⚠️ Certifique-se de que `disabled` não é true
          />

          <label>Cargo:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
            placeholder="Informe o cargo do colaborador"
            disabled={loading}
          />
        </form>
        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCollaborator;
