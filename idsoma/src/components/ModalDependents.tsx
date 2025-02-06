"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/components/ModalDependents.module.css";
import DeleteModal from "@/components/ModalDe";

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
  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(
    null
  );
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      setDependents([...initialDependents]);
    }
  }, [isOpen, initialDependents]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEditDependent = () => {
    if (!formData.name || !formData.relationship) return;

    if (editingDependent) {
      setDependents((prev) =>
        prev.map((dep) =>
          dep.id === editingDependent.id ? { ...dep, ...formData } : dep
        )
      );
      setEditingDependent(null);
    } else {
      const newDependent: Dependent = {
        id:
          dependents.length > 0 ? dependents[dependents.length - 1].id + 1 : 1,
        name: formData.name,
        relationship: formData.relationship,
      };
      setDependents([...dependents, newDependent]);
    }

    setFormData({ name: "", relationship: "" });
    setShowForm(false);
  };

  const handleEditClick = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setFormData({ name: dependent.name, relationship: dependent.relationship });
    setShowForm(true);
  };

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
          <button
            className={styles.addDependentButton}
            onClick={() => setShowForm(true)}
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
              placeholder="Nome do dependente:"
              className={styles.input}
            />
            <label>Parentesco:</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Selecione</option>
              <option value="Filho(a)">Filho(a)</option>
              <option value="Cônjuge">Cônjuge</option>
            </select>
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
                  onClick={() => handleEditClick(dependent)}
                  className={styles.iconButton}
                >
                  <img
                    src="/icon-edit.png"
                    alt="Editar"
                    className={styles.icon}
                  />
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(dependent)}
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

        {/* Botões de Ação */}
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            VOLTAR
          </button>
          {showForm && (
            <button
              className={styles.saveButton}
              onClick={handleAddOrEditDependent}
            >
              SALVAR
            </button>
          )}
        </div>

        {/* DeleteModal */}
        {isDeleteModalOpen && selectedDependent && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onDelete={handleConfirmDelete}
            title="Confirmar Exclusão"
            message={`Tem certeza que deseja excluir o dependente "${selectedDependent.name}"? Essa ação é permanente.`}
          />
        )}
      </div>
    </div>
  );
};

export default ModalDependents;