"use client";

import React from "react";
import styles from "../../styles/ListCollaborators.module.css";
import ModalCollaborator from "../../components/ModalCollaborator";
import ModalDependents from "../../components/ModalDependents";
import DeleteModal from "../../components/ModalDe";
import { useCollaborators } from "../../hooks/useCollaborators"

export default function ListCollaborators() {
  const {
    collaborators,
    searchTerm,
    setSearchTerm,
    isDependentsModalOpen,
    setIsDependentsModalOpen,
    setIsDeleteModalOpen,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
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
    handleDeleteClick
  } = useCollaborators();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleLogout} className={styles.iconButton}>
          <img src="/logout.png" alt="Logout" className={styles.logout} />
        </button>
        <h1 className={styles.title}>Lista de Colaboradores</h1>
        <div className={styles.searchBar}>
          <div className={styles.searchInputContainer}>
            <img
              src="/lupa.png"
              alt="Pesquisar"
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Pesquisar"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.addButton} onClick={handleAddClick}>
          Adicionar Colaborador
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {collaborators
              .filter((collaborator) =>
                collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                collaborator.cpf.includes(searchTerm)
              )
              .map((collaborator) => (
              <tr key={collaborator.id}>
                <td>{collaborator.name}</td>
                <td>{collaborator.cpf}</td>
                <td>{collaborator.role}</td>
                <td className={styles.dependentsActions}>
                  <button
                    onClick={() => handleManageDependents(collaborator)}
                    className={styles.iconButton}
                  >
                    <img src="/icon-view.png" alt="Dependentes" className={styles.icon} />
                  </button>
                  <button
                    onClick={() => handleEditClick(collaborator)}
                    className={styles.iconButton}
                  >
                    <img src="/icon-edit.png" alt="Editar" className={styles.icon} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(collaborator)}
                    className={styles.iconButton}
                  >
                    <img src="/icon-delete.png" alt="Excluir" className={styles.icon} />
                  </button>
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
            selectedCollaborator && selectedCollaborator.dependents
              ? selectedCollaborator.dependents.map((dep) => ({
                  ...dep,
                  collaboratorId: selectedCollaborator.id,
                }))
              : []
          }
          collaboratorId={selectedCollaborator?.id ?? 0}
        />
      )}

      {isDeleteModalOpen && selectedCollaborator && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleConfirmDelete(selectedCollaborator!)} 
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o colaborador "${selectedCollaborator?.name}"? Essa ação é permanente.`}
        />
      )}
    </div>
  );
}
