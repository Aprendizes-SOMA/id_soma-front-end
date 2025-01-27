"use client";

import React, { useState, useEffect } from "react";
import ModalCollaborator from "../../components/ModalCollaborator"; // Novo modal unificado
import styles from "../../styles/ListCollaborators.module.css";

interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
}

export default function ListCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]); // Lista de colaboradores
  const [searchTerm, setSearchTerm] = useState<string>(""); // Termo de pesquisa
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [modalTitle, setModalTitle] = useState<string>(""); // Título do modal
  const [formData, setFormData] = useState<Collaborator>({
    id: 0,
    name: "",
    cpf: "",
    role: "",
  }); // Dados do colaborador no modal
  const [editMode, setEditMode] = useState(false); // Modo de edição

  // Adiciona um colaborador
  const handleAddCollaborator = (data: { name: string; cpf: string; role: string }) => {
    const newId = collaborators.length + 1; // Gera ID único
    setCollaborators([...collaborators, { id: newId, ...data }]);
    setIsModalOpen(false); // Fecha o modal
  };

  // Edita um colaborador
  const handleEditCollaborator = (data: { name: string; cpf: string; role: string }) => {
    setCollaborators((prev) =>
      prev.map((collaborator) =>
        collaborator.id === formData.id ? { ...collaborator, ...data } : collaborator
      )
    );
    setIsModalOpen(false); // Fecha o modal
  };

  // Simulação de dados
  useEffect(() => {
    setCollaborators([
      { id: 1, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
      { id: 2, name: "Maria Silva", cpf: "22233344456", role: "Analista" },
    ]);
  }, []);

  // Abre o modal para adicionar
  const handleAddClick = () => {
    setModalTitle("Adicionar Colaborador");
    setFormData({ id: 0, name: "", cpf: "", role: "" });
    setEditMode(false); // Desativa modo de edição
    setIsModalOpen(true);
  };

  // Abre o modal para editar
  const handleEditClick = (collaborator: Collaborator) => {
    setModalTitle("Editar Colaborador");
    setFormData(collaborator); // Preenche com os dados do colaborador
    setEditMode(true); // Ativa modo de edição
    setIsModalOpen(true);
  };

  // Filtra colaboradores com base no termo de pesquisa
  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
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

      {/* Tabela de Colaboradores */}
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
            {filteredCollaborators.length > 0 ? (
              filteredCollaborators.map((collaborator) => (
                <tr key={collaborator.id}>
                  <td>{collaborator.name}</td>
                  <td>{collaborator.cpf}</td>
                  <td>{collaborator.role}</td>
                  <td className={styles.dependentsActions}>
                    {/* Botão de Visualizar */}
                    <button
                      onClick={() => console.log(`Visualizando: ${collaborator.id}`)}
                      className={styles.iconButton}
                    >
                      <img src="/icon-view.png" alt="Ver" className={styles.icon} />
                    </button>

                    {/* Botão de Editar */}
                    <button
                      onClick={() => handleEditClick(collaborator)}
                      className={styles.iconButton}
                    >
                      <img src="/icon-edit.png" alt="Editar" className={styles.icon} />
                    </button>

                    {/* Botão de Excluir */}
                    <button
                      onClick={() =>
                        setCollaborators((prev) =>
                          prev.filter((c) => c.id !== collaborator.id)
                        )
                      }
                      className={styles.iconButton}
                    >
                      <img src="/icon-delete.png" alt="Excluir" className={styles.icon} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Nenhum colaborador encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Reutilizável */}
      <ModalCollaborator
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editMode ? handleEditCollaborator : handleAddCollaborator}
        title={modalTitle}
        initialData={formData}
      />
    </div>
  );
}
