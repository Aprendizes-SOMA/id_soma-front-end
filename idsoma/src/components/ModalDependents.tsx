"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/components/ModalDependents.module.css";
import ModalDe from "@/components/ModalDe";

interface Dependent {
  id: number;
  name: string;
  relationship: string;
}

interface ModalDependentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dependents: Dependent[]) => void;
  initialDependents: Dependent[];
}

const ModalDependents: React.FC<ModalDependentsProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDependents,
}) => {
  const [dependents, setDependents] = useState<Dependent[]>(initialDependents);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", relationship: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controle da modal de exclusão
  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(
    null
  ); // Dependente selecionado para exclusão

  useEffect(() => {
    setDependents(initialDependents);
  }, [initialDependents]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDependent = () => {
    setShowForm(true);
  };

  const handleSaveDependent = () => {
    if (!formData.name || !formData.relationship) return;
    const newDependent: Dependent = {
      id: dependents.length + 1,
      name: formData.name,
      relationship: formData.relationship,
    };
    setDependents([...dependents, newDependent]);
    setFormData({ name: "", relationship: "" });
    setShowForm(false);
  };

  // Abrir modal de exclusão
  const handleOpenDeleteModal = (dependent: Dependent) => {
    setSelectedDependent(dependent);
    setIsDeleteModalOpen(true);
  };

  // Fechar modal de exclusão
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDependent(null);
  };

  // Confirmar exclusão
  const handleConfirmDelete = () => {
    if (selectedDependent) {
      setDependents(
        dependents.filter((dependent) => dependent.id !== selectedDependent.id)
      );
      handleCloseDeleteModal();
    }
  };

  const handleSave = () => {
    onSave(dependents);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lista de Dependentes</h2>
          <button
            className={styles.addDependentButton}
            onClick={handleAddDependent}
          >
            ADICIONAR DEPENDENTE
          </button>
        </div>
        <div className={styles.modalLine}></div>

        {/* Formulário Inline */}
        {showForm && (
          <div className={styles.inlineForm}>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do dependente"
              className={styles.input}
            />
            <label>Parentesco:</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="Parentesco"
              className={styles.input}
            />
            <button className={styles.saveButton} onClick={handleSaveDependent}>
              SALVAR
            </button>
          </div>
        )}

        {/* Lista de Dependentes */}
        <ul className={styles.dependentsList}>
          {dependents.map((dependent) => (
            <li key={dependent.id} className={styles.dependentItem}>
              <div className={styles.dependentInfo}>
                <span>
                  <span className={styles.dependentLabel}>Nome:</span>
                  <span className={styles.dependentValue}>
                    {" "}
                    {dependent.name}
                  </span>
                </span>
                <span>
                  <span className={styles.dependentLabel}>Parentesco:</span>
                  <span className={styles.dependentValue}>
                    {" "}
                    {dependent.relationship}
                  </span>
                </span>
              </div>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => console.log("Editar", dependent.id)}
                  className={styles.iconButton}
                >
                  <img
                    src="/icon-edit.png"
                    alt="Editar"
                    className={styles.icon}
                  />
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(dependent)} // Abre a modal de exclusão
                  className={styles.iconButton}
                >
                  <img
                    src="/icon-delete.png"
                    alt="Excluir"
                    className={styles.icon}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Botão de Voltar */}
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            VOLTAR
          </button>
        </div>
      </div>

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <ModalDe
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleConfirmDelete}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o dependente "${selectedDependent?.name}"? Esta ação não pode ser desfeita.`}
        />
      )}
    </div>
  );
};

export default ModalDependents;