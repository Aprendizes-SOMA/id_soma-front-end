"use client";
import React from "react";

import styles from "@/styles/ListCollaborators.module.css";

import { useCollaborators } from "@/hooks/useCollaborators";

import ModalCollaborator from "@/components/ModalCollaborator";
import ModalDependents from "@/components/ModalDependents";
import DeleteModal from "@/components/ModalDe";
import CustomButton from "@/components/CustomButton";
import ActionButton from "@/components/ActionButton";

export default function ListCollaborators() {
  const {
    collaborators,
    searchTerm,
    setSearchTerm,
    isDependentsModalOpen,
    setIsDependentsModalOpen,
    isModalOpen,
    setIsModalOpen,
    selectedIds,
    setSelectedIds,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    modalTitle,
    formData,
    selectedCollaborator,
    editMode,
    handleLogout,
    handleAddCollaborator,
    handleEditCollaborator,
    handleSaveDependents,
    handleConfirmDelete,
    handleAddClick,
    handleEditClick,
    handleManageDependents,
    handleDeleteClick,
    handleDeleteSelected,
    handleSearchChange,
    handleToggleSelect
  } = useCollaborators();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <svg 
              viewBox="0 0 1024 1024" 
              xmlns="http://www.w3.org/2000/svg" 
              className={styles.logoutIcon}
            >
              <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>
            </svg>
            Logout
          </button>
          <h1 className={styles.title}>Colaboradores</h1>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchInputContainer}>
            <img src="/lupa.png" alt="Pesquisar" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquise por nome ou CPF"
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
              maxLength={14}
            />
          </div>

          <CustomButton text="Adicionar colaborador" onClick={handleAddClick} color="primary" />

          {selectedIds.length > 0 && (
            <CustomButton text={`Excluir Selecionados (${selectedIds.length})`} onClick={handleDeleteSelected} color="danger" />
          )}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  onChange={(e) =>
                    setSelectedIds(e.target.checked ? collaborators.map((c) => c.id) : [])
                  }
                  checked={selectedIds.length === collaborators.length && collaborators.length > 0}
                />
              </th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {collaborators
              .filter(
                (collaborator) =>
                  collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  collaborator.cpf.includes(searchTerm)
              )
              .map((collaborator) => (
                <tr key={collaborator.id}>
                  <td className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={selectedIds.includes(collaborator.id)}
                      onChange={() => handleToggleSelect(collaborator.id)}
                    />
                  </td>
                  <td>{collaborator.name}</td>
                  <td>{collaborator.cpf}</td>
                  <td>{collaborator.role}</td>
                  <td className={styles.actions}>
                    <ActionButton 
                      iconSrc="/icon-view.png" 
                      altText="Dependentes" 
                      onClick={() => handleManageDependents(collaborator)}
                    />
                    
                    <ActionButton 
                      iconSrc="/icon-edit.png" 
                      altText="Editar" 
                      onClick={() => handleEditClick(collaborator)}
                    />

                    <ActionButton 
                      iconSrc="/icon-delete.png" 
                      altText="Excluir" 
                      onClick={() => handleDeleteClick(collaborator)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ModalCollaborator
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editMode ? handleEditCollaborator : handleAddCollaborator}
        title={modalTitle}
        initialData={formData}
      />

      {isDependentsModalOpen && selectedCollaborator && (
        <ModalDependents
          isOpen={isDependentsModalOpen}
          onClose={() => setIsDependentsModalOpen(false)}
          onSave={handleSaveDependents}
          initialDependents={
            selectedCollaborator?.dependents?.map((dep) => ({
              ...dep,
              collaboratorId: selectedCollaborator.id,
            })) || []
          }
          collaboratorId={selectedCollaborator?.id ?? 0}
        />
      )}

      {isDeleteModalOpen && selectedCollaborator && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleConfirmDelete(selectedCollaborator)}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o colaborador "${selectedCollaborator?.name}"? Essa ação é permanente.`}
        />
      )}
    </div>
  );
}
