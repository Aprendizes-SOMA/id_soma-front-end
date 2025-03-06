"use client";

import React, { useState, useEffect } from "react";

import styles from "@/styles/ModalDependents.module.css";
import ConfirmationModal from "@/components/ConfirmationModal";
import CustomButton from "@/components/CustomButton";
import ActionButton from "@/components/ActionButton";
import TextInput from "@/components/TextInput";

import useAddOrEdit from "@/hooks/useAddOrEdit";
import useDelete from "@/hooks/useDelete";

import {
  addDependent,
  updateDependent,
  deleteDependent,
  listDependents
} from "@/app/api/dependent/dependents";

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
  const [formData, setFormData] = useState<Dependent>({
    id: 0,
    name: "",
    parentesco: "",
    collaboratorId: 0,
  });

  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(null);
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(null);
  const adminId = 3;

  const {
    selectedIds,
    setSelectedIds,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteSelected,
    handleConfirmDelete,
    handleToggleSelect
  } = useDelete();

  const { handleAddOrEdit } = useAddOrEdit();

  useEffect(() => {
    const fetchDependents = async () => {
      if (!collaboratorId) return;
      setLoading(true);
      try {
        const data = await listDependents(collaboratorId);
        setDependents(data);
      } catch (error) {
        console.error("Erro ao carregar dependentes:", error);
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

  const handleSubmit = async () => {
    if (!formData.name || !formData.parentesco) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    await handleAddOrEdit(
      { ...formData, collaboratorId, adminId },
      editingDependent,
      addDependent,
      updateDependent,
      setDependents,
      setEditingDependent,
      setFormData
    );

    setShowForm(false);
    onSave(dependents);
  };

  const handleEditClick = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setFormData({
      id: dependent.id,
      name: dependent.name,
      parentesco: dependent.parentesco,
      collaboratorId: dependent.collaboratorId,
    });
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lista de Dependentes</h2>
          {!showForm && (
            <CustomButton
              text="Adicionar Dependente"
              onClick={() => setShowForm(true)}
              color="primary"
            />
          )}
  
          {selectedIds.length > 0 && (
            <CustomButton
              text={`Excluir Selecionados (${selectedIds.length})`}
              onClick={() =>
                handleDeleteSelected(
                  deleteDependent,
                  setDependents,
                  setSelectedDependent
                )
              }
              color="danger"
            />
          )}
        </div>
  
        <div className={styles.modalLine}></div>
  
        {/* BODY (form + tabela) */}
        <div className={styles.modalBody}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Carregando dependentes...</p>
            </div>
          ) : (
            <>
              {showForm && (
                <div className={styles.inlineForm}>
                  <TextInput
                    label="Nome"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    placeholder="Informe o nome do dependente"
                    onChange={handleChange}
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
                  <div className={styles.buttonGroup}>
                    <CustomButton
                      text="Cancelar"
                      onClick={() => {
                        setShowForm(false);
                        setEditingDependent(null);
                      }}
                      color="danger"
                    />
                    <CustomButton
                      text={editingDependent ? "Atualizar" : "Adicionar"}
                      onClick={handleSubmit}
                      color="primary"
                    />
                  </div>
                </div>
              )}
  
              <div className={styles.tableSection}>
                {dependents.length > 0 ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            className={styles.checkboxInput}
                            onChange={(e) =>
                              setSelectedIds(
                                e.target.checked
                                  ? dependents.map((c) => c.id)
                                  : []
                              )
                            }
                            checked={
                              selectedIds.length === dependents.length &&
                              dependents.length > 0
                            }
                          />
                        </th>
                        <th>Nome</th>
                        <th>Parentesco</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dependents.map((dependent) => (
                        <tr key={dependent.id}>
                          <td>
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              checked={selectedIds.includes(dependent.id)}
                              onChange={() => handleToggleSelect(dependent.id)}
                            />
                          </td>
                          <td>{dependent.name}</td>
                          <td>{dependent.parentesco}</td>
                          <td className={styles.actionButtons}>
                            <ActionButton
                              iconSrc="/icon-edit.png"
                              altText="Editar"
                              onClick={() => handleEditClick(dependent)}
                              disabled={selectedIds.length > 0}
                            />
                            <ActionButton
                              iconSrc="/icon-delete.png"
                              altText="Excluir"
                              onClick={() => handleOpenDeleteModal(dependent)}
                              disabled={selectedIds.length > 0}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.noDependentsMessage}>
                    Esse colaborador não tem dependentes.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
  
        {/* FOOTER (botão Voltar) */}
        <div className={styles.modalActions}>
          <CustomButton text="Voltar" onClick={onClose} color="secondary" />
        </div>
  
        {isDeleteModalOpen && selectedDependent && (
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={() =>
              handleConfirmDelete(
                selectedDependent,
                deleteDependent,
                setDependents,
                setSelectedDependent
              )
            }
            title="Confirmar Exclusão"
            message={`Tem certeza que deseja excluir o dependente "${selectedDependent.name}"? Essa ação é permanente.`}
          />
        )}
      </div>
    </div>
  );  
};

export default ModalDependents;
