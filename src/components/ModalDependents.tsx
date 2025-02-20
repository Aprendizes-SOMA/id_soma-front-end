"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/ModalDependents.module.css";
import DeleteModal from "@/components/ModalDe";
import { addDependent, updateDependent, deleteDependent, listDependents } from "../app/api/dependent/dependents";



const ModalDependents: React.FC<ModalDependentsProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDependents,
  collaboratorId,
}) => {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", parentesco: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(null);
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(null);
  const adminId = 3;

  useEffect(() => {
    const fetchDependents = async () => {
      if (!collaboratorId) return;
      setLoading(true);
      try {
        const data = await listDependents(collaboratorId);
        setDependents(data);
      } catch (error) {
        console.error("Erro ao carregar dependentes:", error);
        alert("Erro ao carregar dependentes. Verifique a API e tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchDependents();
    }
  }, [isOpen, collaboratorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEditDependent = async () => {
    if (!formData.name || !formData.parentesco) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    try {
      if (editingDependent) {
        const updatedDependent = await updateDependent(editingDependent.id!, formData);
        setDependents((prev) =>
          prev.map((dep) => (dep.id === editingDependent.id ? { ...updatedDependent } : dep))
        );
      } else {
        const newDependent = await addDependent({
          ...formData,
          collaboratorId: collaboratorId,
          adminId: adminId,
        });
        setDependents((prev) => [...prev, newDependent]);
      }
      setFormData({ name: "", parentesco: "" });
      setShowForm(false);
      setEditingDependent(null);
    } catch (error) {
      console.error("Erro ao salvar dependente:", error);
      alert("Erro ao salvar dependente. Por favor, tente novamente.");
    }
  };

  const handleEditClick = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setFormData({ name: dependent.name, parentesco: dependent.parentesco });
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

  const handleConfirmDelete = async () => {
    if (selectedDependent) {
      try {
        await deleteDependent(selectedDependent.id!);
        setDependents((prev) => prev.filter((dependent) => dependent.id !== selectedDependent.id));
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir dependente:", error);
        alert("Erro ao excluir dependente.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lista de Dependentes</h2>
          {!showForm && (
            <button className={styles.addDependentButton} onClick={() => setShowForm(true)}>
              ADICIONAR DEPENDENTE
            </button>
          )}
        </div>
        <div className={styles.modalLine}></div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando dependentes...</p>
          </div>
        ) : (
          <>
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
                  name="parentesco"
                  value={formData.parentesco}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="">Selecione</option>
                  <option value="Filho(a)">Filho(a) ou enteado(a)</option>
                  <option value="Cônjuge">Cônjuge</option>
                </select>
                <button className={styles.saveButton} onClick={handleAddOrEditDependent}>
                  {editingDependent ? "ATUALIZAR" : "ADICIONAR"}
                </button>
              </div>
            )}
            <ul className={styles.dependentsList}>
              {dependents.map((dependent) => (
                <li key={dependent.id} className={styles.dependentItem}>
                  <div className={styles.dependentInfo}>
                    <span>
                      <span className={styles.dependentLabel}>Nome:</span> {dependent.name}
                    </span>
                    <span>
                      <span className={styles.dependentLabel}>Parentesco:</span> {dependent.parentesco}
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
          </>
        )}
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            VOLTAR
          </button>
        </div>
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