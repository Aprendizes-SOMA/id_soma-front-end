"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/components/Modal.module.css";

interface Dependent {
  id: number;
  name: string;
  relationship: string;
}

interface ModalDependentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dependents: Dependent[]) => void; // Salva a lista de dependentes
  initialDependents: Dependent[]; // Lista inicial de dependentes
}

const ModalDependents: React.FC<ModalDependentsProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDependents,
}) => {
  const [dependents, setDependents] = useState<Dependent[]>(initialDependents);
  const [formData, setFormData] = useState({ name: "", relationship: "" });

  useEffect(() => {
    setDependents(initialDependents); // Atualiza os dependentes quando o modal abre
  }, [initialDependents]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDependent = () => {
    const newDependent: Dependent = {
      id: dependents.length + 1, // Gera um ID único
      name: formData.name,
      relationship: formData.relationship,
    };
    setDependents([...dependents, newDependent]); // Adiciona o dependente à lista
    setFormData({ name: "", relationship: "" }); // Reseta o formulário
  };

  const handleDeleteDependent = (id: number) => {
    setDependents(dependents.filter((dependent) => dependent.id !== id)); // Remove o dependente
  };

  const handleSave = () => {
    onSave(dependents); // Salva os dependentes e fecha o modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Lista de Dependentes</h2>
        <div className={styles.modalLine}></div>
        <ul className={styles.dependentsList}>
          {dependents.map((dependent) => (
            <li key={dependent.id} className={styles.dependentItem}>
              <span>
                <strong>Nome:</strong> {dependent.name}
              </span>
              <span>
                <strong>Parentesco:</strong> {dependent.relationship}
              </span>
              <button
                onClick={() => handleDeleteDependent(dependent.id)}
                className={styles.deleteButton}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <form className={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do dependente"
            className={styles.input}
          />
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="Parentesco"
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleAddDependent}
            className={styles.addDependentButton}
          >
            Adicionar Dependente
          </button>
        </form>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Voltar
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Salvar Dependentes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDependents;
