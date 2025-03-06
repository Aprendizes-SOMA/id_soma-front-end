"use client";

import React, { useEffect, useState } from "react";

import styles from "@/styles/ListCollaborators.module.css";

import ModalCollaborator from "@/components/ModalCollaborator";
import ModalDependents from "@/components/ModalDependents";
import CustomButton from "@/components/CustomButton";
import ModalImportCSV from "@/components/ModalImportCSV";
import ActionButton from "@/components/ActionButton";
import NotificationModal from "@/components/NotificationModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import axiosInstance from "@/app/api/axiosInstance";
import { updateCollaborator, listCollaborators, deleteCollaborator, addCollaborator } from "@/app/api/collaborator/collaborators";
import { logoutAdmin } from "@/app/api/admin/auth";

import { useRouter } from "next/navigation";

import useSearch from "@/hooks/useSearch";
import useFormatCPF from "@/hooks/useFormatCPF";
import useDelete from "@/hooks/useDelete";
import useAddOrEdit from "@/hooks/useAddOrEdit";

import { importCSV } from "@/app/api/csv/import-csv";

import Image from 'next/image'

export default function ListCollaborators() {
  const router = useRouter();
  const { formatCPF } = useFormatCPF();
  const {
    searchTerm,
    inputMaxLength,
    handleSearchChange
  } = useSearch();

  const {
    selectedIds,
    setSelectedIds,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteSelected,
    handleConfirmDelete,
    handleToggleSelect
  } = useDelete();

  const {
    handleAddOrEdit
  } = useAddOrEdit();

  const [notification, setNotification] = useState({ isOpen: false, type: "success", message: "" });
  const [isDependentsModalOpen, setIsDependentsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [formData, setFormData] = useState<Collaborator>({
    id: 0,
    name: "",
    cpf: "",
    role: "",
    matricula: "",
    dependents: [],
  });

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

  const handleAddOrEditCollaborator = async (data: { name: string; cpf: string; role: string; matricula: string }) => {
    await handleAddOrEdit(
      data,
      selectedCollaborator,
      addCollaborator,
      updateCollaborator,
      setCollaborators,
      setSelectedCollaborator,
      setFormData,
      { adminId: 3 }
    );
    setIsModalOpen(false);
  };  
  
  const handleAddClick = () => {
    setModalTitle("Adicionar Colaborador");
    setFormData({ id: 0, name: "", cpf: "", role: "", matricula: "", dependents: [] });
    setEditMode(false);
    setIsModalOpen(true);
  };
  
  const handleEditClick = (collaborator: Collaborator) => {
    setModalTitle("Editar Colaborador");
    setFormData({
      id: collaborator.id,
      name: collaborator.name || "",
      cpf: collaborator.cpf || "",
      role: collaborator.role || "",
      matricula: collaborator.matricula || "",
      dependents: collaborator.dependents || [],
    });
  
    setSelectedCollaborator(collaborator);
    setEditMode(true);
    setIsModalOpen(true);
  };  

  const handleDeleteClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDeleteModalOpen(true);
  };

  const handleUpload = async (file: File) => {
    try {
      await importCSV(file);
  
      setNotification({ isOpen: true, type: "success", message: "CSV importado com sucesso!" });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Erro ao importar CSV:", error);
      setNotification({ isOpen: true, type: "error", message: "Erro ao importar CSV" });
    }
  };

  const handleManageDependents = async (collaborator: Collaborator) => {
    try {
      setSelectedCollaborator(collaborator);
      setIsDependentsModalOpen(true);
  
      const response = await axiosInstance.get(`/dependents`, {
        params: { collaboratorId: collaborator.id },
      });
  
      setSelectedCollaborator((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          dependents: response.data,
        };
      });
    } catch (error) {
      console.error("Erro ao buscar dependentes:", error);
      alert("Erro ao carregar dependentes. Por favor, tente novamente.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/loginAdmin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className={styles.container}>
      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type as "success" | "error"}
        message={notification.message}
        onClose={() => setNotification({ isOpen: false, type: "success", message: "" })}
      />
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <Image src="./logout.png" alt="Logout" className={styles.logoutIcon} height={30} width={30} />
            Logout
          </button>
          <h1 className={styles.title}>Colaboradores</h1>
        </div>

        <div className={styles.headerRight}>
          <CustomButton text="Importar CSV" onClick={() => setIsImportModalOpen(true)} color="secondary" />

          <div className={styles.searchInputContainer}>
            <Image src="./lupa.png" alt="Pesquisar" className={styles.searchIcon} width={30} height={30} />
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
            <CustomButton 
              text={`Excluir Selecionados (${selectedIds.length})`} 
              onClick={() => handleDeleteSelected(deleteCollaborator, setCollaborators, setSelectedCollaborator)}
              color="danger" 
            />
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
              <th>Matricula</th>
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
                  <td><strong>{collaborator.matricula}</strong></td>
                  <td>{collaborator.name}</td>
                  <td>{collaborator.cpf}</td>
                  <td>{collaborator.role}</td>
                  <td className={styles.actions}>
                    <ActionButton 
                      iconSrc="/icon-view.png" 
                      altText="Dependentes" 
                      onClick={() => handleManageDependents(collaborator)} 
                      disabled={selectedIds.length > 0}
                    />
                    <ActionButton 
                      iconSrc="/icon-edit.png" 
                      altText="Editar" 
                      onClick={() => handleEditClick(collaborator)} 
                      disabled={selectedIds.length > 0}
                    />
                    <ActionButton 
                      iconSrc="/icon-delete.png" 
                      altText="Excluir" 
                      onClick={() => handleDeleteClick(collaborator)} 
                      disabled={selectedIds.length > 0} 
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ModalImportCSV
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onUpload={handleUpload}
      />

      <ModalCollaborator
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddOrEditCollaborator}
        title={modalTitle}
        initialData={formData}
      />

      {isDependentsModalOpen && selectedCollaborator && (
        <ModalDependents
          isOpen={isDependentsModalOpen}
          onClose={() => setIsDependentsModalOpen(false)}
          onSave={(updatedDependents) => {
            setSelectedCollaborator((prev) =>
              prev ? { ...prev, dependents: updatedDependents } : prev
            );
          }}
          initialDependents={selectedCollaborator?.dependents ?? []}
          collaboratorId={selectedCollaborator?.id ?? 0}
        />      
      )}

      {isDeleteModalOpen && selectedCollaborator && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleConfirmDelete(
            selectedCollaborator,
            deleteCollaborator,
            setCollaborators,
            setSelectedCollaborator
          )}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o colaborador "${selectedCollaborator?.name}"? Essa ação é permanente.`}
        />
      )}
    </div>
  );
}
