"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalCollaborator from "../../components/ModalCollaborator";
import ModalDependents from "../../components/ModalDependents";
import DeleteModal from "../../components/ModalDe";
import styles from "../../styles/ListCollaborators.module.css";
import { addCollaborator, listCollaborators, updateCollaborator, deleteCollaborator } from "../api/collaborator/collaborators";
import { logoutAdmin } from "../api/admin/auth";
import axios from "axios";

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
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await listCollaborators();
        setCollaborators(data);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
      }
    };

    fetchCollaborators();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/loginAdmin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleAddCollaborator = async (data: { name: string; cpf: string; role: string }) => {
    try {
      setLoading(true);
      console.log("Enviando dados do colaborador:", data);

      const newCollaborator = await addCollaborator({
        name: data.name,
        cpf: data.cpf,
        role: data.role,
        adminId: 3,
      });

      console.log("Colaborador adicionado com sucesso:", newCollaborator);
      setCollaborators((prev) => [...prev, { ...newCollaborator, dependents: [] }]);
      alert("Colaborador adicionado com sucesso!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao adicionar colaborador:", error);
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data.message || "Erro desconhecido"}`);
      } else {
        alert("Erro ao adicionar colaborador. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditCollaborator = async (data: { name: string; cpf: string; role: string }) => {
    if (!selectedCollaborator) return;

    setLoading(true);

    try {
      const updatedCollaborator = await updateCollaborator(selectedCollaborator.id, {
        name: data.name,
        cpf: data.cpf,
        role: data.role,
      });

      setCollaborators((prev) =>
        prev.map((collaborator) =>
          collaborator.id === selectedCollaborator.id ? updatedCollaborator : collaborator
        )
      );

      alert("Colaborador atualizado com sucesso!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao editar colaborador:", error);
      alert(`Erro ao editar colaborador: ${error.response?.data?.message || "Erro desconhecido."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCollaborator) return;
  
    try {
      await deleteCollaborator(selectedCollaborator.id);
  
      setCollaborators((prev) => prev.filter((c) => c.id !== selectedCollaborator.id));
  
      alert("Colaborador excluído com sucesso!");
      setSelectedCollaborator(null);
    } catch (error: any) {
      console.error("Erro ao excluir colaborador:", error);
  
      if (error.response && error.response.data) {
        alert(`Erro ao excluir colaborador: ${error.response.data.error || "Erro desconhecido."}`);
      } else {
        alert("Erro ao excluir colaborador. Por favor, tente novamente.");
      }
    } finally {
      setIsDeleteModalOpen(false);
    }
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
    setIsDeleteModalOpen(false);
    setIsDependentsModalOpen(true);
  };

  const handleDeleteClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDependentsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleLogout} className={styles.iconButton}>
          <img src="/logout.png" alt="Logout" className={styles.logout} />
        </button>
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
          initialDependents={selectedCollaborator.dependents ?? []}
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
