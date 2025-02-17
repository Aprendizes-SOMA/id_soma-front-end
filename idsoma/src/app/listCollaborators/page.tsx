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

  const numericSearch = searchTerm.replace(/\D/g, "");
  const inputMaxLength = (numericSearch && numericSearch.length <= 11) ? 14 : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <button onClick={handleLogout} className={styles.logoutButton}>
      <img 
        src="/logout.png" 
        alt="Logout" 
        className={styles.logoutIcon} 
      />
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
              maxLength={inputMaxLength}
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
              .filter((collaborator) => {
                const searchLower = searchTerm.toLowerCase().trim();

                const cpfSearch = searchTerm.replace(/\D/g, "");
                const isNumeric = /^\d+$/.test(cpfSearch);

                if (isNumeric) {
                  return collaborator.cpf.replace(/\D/g, "").includes(cpfSearch);
                } else {
                  return collaborator.name.toLowerCase().includes(searchLower);
                }
              })
              .sort((a, b) => a.name.localeCompare(b.name))
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
