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
import useDelete from "@/hooks/useDelete";
import useAddOrEdit from "@/hooks/useAddOrEdit";

import { importCSV } from "@/app/api/csv/import-csv";

import Image from 'next/image'

export default function ListCollaborators() {
  const router = useRouter();
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
  const [filteredCollaborators, setFilteredCollaborators] = useState<Collaborator[]>([]);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(collaborators.length / itemsPerPage);

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

  useEffect(() => {
    const filtered = collaborators.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.cpf.includes(searchTerm)
    );

    setFilteredCollaborators(filtered);
    setCurrentPage(1);
  }, [searchTerm, collaborators]);

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
      router.push("/verification/loginAdmin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

   const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.002 320.002" className={styles.logoutIcon}>
              <g id="XMLID_6_">
                <path id="XMLID_7_" d="M51.213,175.001h173.785c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H51.213l19.394-19.394
                  c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0L4.396,149.393c-0.351,0.351-0.683,0.719-0.997,1.103
                  c-0.137,0.167-0.256,0.344-0.385,0.515c-0.165,0.22-0.335,0.435-0.488,0.664c-0.14,0.209-0.261,0.426-0.389,0.64
                  c-0.123,0.206-0.252,0.407-0.365,0.619c-0.118,0.22-0.217,0.446-0.323,0.67c-0.104,0.219-0.213,0.435-0.306,0.659
                  c-0.09,0.219-0.164,0.442-0.243,0.664c-0.087,0.24-0.179,0.477-0.253,0.722c-0.067,0.222-0.116,0.447-0.172,0.672
                  c-0.063,0.249-0.133,0.497-0.183,0.751c-0.051,0.259-0.082,0.521-0.119,0.782c-0.032,0.223-0.075,0.443-0.097,0.669
                  c-0.048,0.484-0.073,0.971-0.074,1.457c0,0.007-0.001,0.015-0.001,0.022c0,0.007,0.001,0.015,0.001,0.022
                  c0.001,0.487,0.026,0.973,0.074,1.458c0.022,0.223,0.064,0.44,0.095,0.661c0.038,0.264,0.069,0.528,0.121,0.79
                  c0.05,0.252,0.119,0.496,0.182,0.743c0.057,0.227,0.107,0.456,0.175,0.681c0.073,0.241,0.164,0.474,0.248,0.71
                  c0.081,0.226,0.155,0.453,0.247,0.675c0.091,0.22,0.198,0.431,0.3,0.646c0.108,0.229,0.21,0.46,0.33,0.685
                  c0.11,0.205,0.235,0.4,0.354,0.599c0.131,0.221,0.256,0.444,0.4,0.659c0.146,0.219,0.309,0.424,0.466,0.635
                  c0.136,0.181,0.262,0.368,0.407,0.544c0.299,0.364,0.616,0.713,0.947,1.048c0.016,0.016,0.029,0.034,0.045,0.05l45,45.001
                  c2.93,2.929,6.768,4.394,10.607,4.394c3.838-0.001,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0.001-21.213L51.213,175.001
                  z"/>
                <path id="XMLID_8_" d="M305.002,25h-190c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15V55h160v210.001h-160
                  v-45.001c0-8.284-6.716-15-15-15s-15,6.716-15,15v60.001c0,8.284,6.716,15,15,15h190c8.284,0,15-6.716,15-15V40
                  C320.002,31.716,313.286,25,305.002,25z"/>
              </g>
              </svg>
            Logout
          </button>
          <h1 className={styles.title}>Colaboradores</h1>
        </div>

        <div className={styles.headerRight}>
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

          <div className={styles.button}>
            <CustomButton text="Importar CSV" onClick={() => setIsImportModalOpen(true)} color="secondary" />

            <CustomButton text="Adicionar colaborador" onClick={handleAddClick} color="primary" />
          </div>

          {selectedIds.length > 0 && (
            <CustomButton 
              text={`Excluir Selecionados (${selectedIds.length})`} 
              onClick={() => handleDeleteSelected(deleteCollaborator, setCollaborators, setSelectedCollaborator)}
              color="danger" 
            />
          )}
        </div>
      </div>

      <div className={styles.tableWrapper}>
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
              {filteredCollaborators
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
                      <ActionButton iconSrc="./icon-view.png" altText="Dependentes" onClick={() => handleManageDependents(collaborator)} />
                      <ActionButton iconSrc="./icon-edit.png" altText="Editar" onClick={() => handleEditClick(collaborator)} />
                      <ActionButton iconSrc="./icon-delete.png" altText="Excluir" onClick={() => handleDeleteClick(collaborator)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <CustomButton text="Anterior" onClick={handlePrevPage} disabled={currentPage === 1} />
          <span>Página {currentPage} de {totalPages}</span>
          <CustomButton text="Próximo" onClick={handleNextPage} disabled={currentPage === totalPages} />
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
    </div>
  );
}
