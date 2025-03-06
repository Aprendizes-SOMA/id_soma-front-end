"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/Modal.module.css";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";

import useFormatCPF from "@/hooks/useFormatCPF";

const ModalCollaborator: React.FC<ModalCollaboratorProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialData = { name: "", cpf: "", role: "", matricula: "" },
}) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { formatCPF } = useFormatCPF();

  useEffect(() => {
    if (isOpen) {
      setFormData(
        title === "Adicionar Colaborador"
          ? { name: "", cpf: "", role: "", matricula: "" }
          : initialData
      );
    }
  }, [isOpen, title, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "cpf" ? formatCPF(value) : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.cpf.trim() ||
      !formData.role.trim() ||
      !formData.matricula.trim()
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
          <div className={styles.inputGroup}>
            <TextInput
              label="Nome"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Informe o nome do colaborador"
              onChange={handleChange}
            />
            <TextInput
              label="CPF"
              id="cpf"
              name="cpf"
              type="text"
              value={formData.cpf}
              placeholder="Informe o CPF do colaborador"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <TextInput
              label="Cargo"
              id="role"
              name="role"
              type="text"
              value={formData.role}
              placeholder="Informe o cargo do colaborador"
              onChange={handleChange}
            />
            <TextInput
              label="Matrícula"
              id="matricula"
              name="matricula"
              type="text"
              value={formData.matricula}
              placeholder="Informe a matrícula do colaborador"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className={styles.modalActions}>
          <CustomButton text="Cancelar" onClick={onClose} color="danger" disabled={loading} />
          <CustomButton text={loading ? "Salvando..." : "Salvar"} onClick={handleSubmit} color="primary" disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default ModalCollaborator;
