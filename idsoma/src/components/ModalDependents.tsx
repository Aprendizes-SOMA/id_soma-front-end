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
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", relationship: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(null);

  // 🔹 NOVO: Estado para rastrear dependente sendo editado
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDependents([...initialDependents]);
    }
  }, [isOpen, initialDependents]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDependent = () => {
    setShowForm(true);
    setEditingDependent(null); // Garante que não está editando um existente
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

  // 🔹 NOVO: Função para ativar o modo de edição
  const handleEditClick = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setFormData({ name: dependent.name, relationship: dependent.relationship });
  };

  // 🔹 NOVO: Função para salvar a edição
  const handleSaveEdit = () => {
    if (!editingDependent) return;
    setDependents((prev) =>
      prev.map((dep) =>
        dep.id === editingDependent.id ? { ...dep, ...formData } : dep
      )
    );
    setEditingDependent(null);
    setFormData({ name: "", relationship: "" });
  };

  const handleDeleteDependent = (id: number) => {
    setDependents((prev) => prev.filter((dependent) => dependent.id !== id));
  };

  // 🔹 NOVO: Modal de Exclusão
  const handleOpenDeleteModal = (dependent: Dependent) => {
    setSelectedDependent(dependent);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDependent(null);
  };

  const handleConfirmDelete = () => {
    if (selectedDependent) {
      setDependents((prev) =>
        prev.filter((dependent) => dependent.id !== selectedDependent.id)
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
          <button className={styles.addDependentButton} onClick={handleAddDependent}>
            ADICIONAR DEPENDENTE
          </button>
        </div>
        <div className={styles.modalLine}></div>

        {/* Formulário Inline */}
        {(showForm || editingDependent) && (
          <div className={styles.inlineForm}>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do dependente:"
              className={styles.input}
            />
            <label>Parentesco:</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="Parentesco:"
              className={styles.input}
            />
            <button
              className={styles.saveButton}
              onClick={editingDependent ? handleSaveEdit : handleSaveDependent}
            >
              {editingDependent ? "SALVAR ALTERAÇÕES" : "SALVAR"}
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
                  <span className={styles.dependentValue}> {dependent.name}</span>
                </span>
                <span>
                  <span className={styles.dependentLabel}>Parentesco:</span>
                  <span className={styles.dependentValue}> {dependent.relationship}</span>
                </span>
              </div>
              <div className={styles.actionButtons}>
                <button onClick={() => handleEditClick(dependent)} className={styles.iconButton}>
                  <img src="/icon-edit.png" alt="Editar" className={styles.icon} />
                </button>
                <button onClick={() => handleOpenDeleteModal(dependent)} className={styles.iconButton}>
                  <img src="/icon-delete.png" alt="Excluir" className={styles.icon} />
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
          <button className={styles.saveButton} onClick={handleSave}>
            SALVAR
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
