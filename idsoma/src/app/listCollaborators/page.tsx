"use client";

import React, { useState, useEffect } from "react";
import ModalCollaborator from "../../components/ModalCollaborator";
import ModalDependents from "../../components/ModalDependents";
import DeleteModal from "../../components/ModalDe";
import styles from "../../styles/ListCollaborators.module.css";

interface Dependent {
  id: number;
  name: string;
  relationship: string;
}

interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
  dependents: Dependent[];
}

export default function ListCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDependentsModalOpen, setIsDependentsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [formData, setFormData] = useState<Collaborator>({
    id: 0,
    name: "",
    cpf: "",
    role: "",
    dependents: [],
  });
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddCollaborator = (data: { name: string; cpf: string; role: string }) => {
    const newId = collaborators.length + 1;
    setCollaborators([...collaborators, { id: newId, ...data, dependents: [] }]);
    setIsModalOpen(false);
  };

  const handleEditCollaborator = (data: { name: string; cpf: string; role: string }) => {
    setCollaborators((prev) =>
      prev.map((collaborator) =>
        collaborator.id === formData.id ? { ...collaborator, ...data } : collaborator
      )
    );
    setIsModalOpen(false);
  };

  const handleSaveDependents = (updatedDependents: Dependent[]) => {
    if (!selectedCollaborator) return;
    setCollaborators((prev) =>
      prev.map((collaborator) =>
        collaborator.id === selectedCollaborator.id
          ? { ...collaborator, dependents: updatedDependents }
          : collaborator
      )
    );
    setIsDependentsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCollaborator) return;
    setCollaborators((prev) => prev.filter((c) => c.id !== selectedCollaborator.id));
    setSelectedCollaborator(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setCollaborators([
      {
        id: 1,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
        dependents: [],
      },
      {
        id: 2,
        name: "Maria Silva",
        cpf: "22233344456",
        role: "Analista",
        dependents: [],
      },
    ]);
  }, []);

  const handleAddClick = () => {
    setModalTitle("Adicionar Colaborador");
    setFormData({ id: 0, name: "", cpf: "", role: "", dependents: [] });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (collaborator: Collaborator) => {
    setModalTitle("Editar Colaborador");
    setFormData(collaborator);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleManageDependents = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDeleteModalOpen(false); // Garante que o modal de exclusão está fechado
    setIsDependentsModalOpen(true);
  };

  const handleDeleteClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDependentsModalOpen(false); // Garante que o modal de dependentes está fechado
    setIsDeleteModalOpen(true);
  };

  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de Colaboradores</h1>
        <div className={styles.searchBar}>
          <div className={styles.searchInputContainer}>
            <img src="/lupa.png" alt="Pesquisar" className={styles.searchIcon} />
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
          ADICIONAR NOVO COLABORADOR
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
            {filteredCollaborators.map((collaborator) => (
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
          initialDependents={selectedCollaborator.dependents}
        />
      )}

      {isDeleteModalOpen && selectedCollaborator && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o colaborador "${selectedCollaborator.name}"? Essa ação é permanente.`}
        />
      )}
    </div>
  );
}