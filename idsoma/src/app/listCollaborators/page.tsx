"use client";

import React, { useState, useEffect } from "react";
import ModalAddCollaborator from "../../components/ModalAddCollaborator"; // Importa o modal
import styles from "../../styles/ListCollaborators.module.css"
import ModalEditCollab from "@/components/ModalEditCollab";



// Tipo para um colaborador
interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
}

export default function ListCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]); // Lista de colaboradores
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado do campo de pesquisa
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle de visibilidade do modal

  const handleAddCollaborator = (data: {
    name: string;
    cpf: string;
    role: string;
  }) => {
    const newId = collaborators.length + 1; // Gera um novo ID
    setCollaborators([...collaborators, { id: newId, ...data }]); // Adiciona o novo colaborador à lista
    setIsModalOpen(false); // Fecha o modal após adicionar
  };

  // Simulação de dados para a lista de colaboradores
  useEffect(() => {
    setCollaborators([
      {
        id: 1,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      { id: 2, name: "Maria Silva", cpf: "22233344456", role: "Analista" },
      { id: 3, name: "João Sousa", cpf: "33344455567", role: "Supervisor" },
      { id: 4, name: "Ana Costa", cpf: "44455566678", role: "Técnico" },
      { id: 5, name: "Carlos Almeida", cpf: "55566677789", role: "Gerente" },
      {
        id: 6,
        name: "Beatriz Oliveira",
        cpf: "66677788899",
        role: "Engenheira",
      },
      { id: 7, name: "Lucas Santos", cpf: "77788899900", role: "Programador" },
      {
        id: 8,
        name: "Gabriel Costa",
        cpf: "88899900011",
        role: "Desenvolvedor",
      },
      { id: 9, name: "Carla Silva", cpf: "99900011122", role: "Analista" },
      { id: 10, name: "Patrícia Gomes", cpf: "00011122233", role: "Técnica" },
      {
        id: 11,
        name: "Roberto Almeida",
        cpf: "11122233344",
        role: "Supervisor",
      },
    ]);
  }, []);

  // Filtra colaboradores com base no termo de pesquisa
  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleView(id: number): void {
    throw new Error("Function not implemented.");
  }

  function handleEdit(id: number): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(id: number): void {
    throw new Error("Function not implemented.");
  }

  function handleEditCollab(data: { name: string; cpf: string; role: string; }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={styles.container}>
      {/* Linha Superior */}
      <div className={styles.header}>
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
              value={searchTerm} // Vincula ao estado de pesquisa
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
            />
          </div>
        </div>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)} // Abre o modal
        >
          ADICIONAR NOVO COLABORADOR
        </button>
      </div>

      {/* Tabela de Colaboradores com Rolagem */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Dependentes</th>
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
                    <button
                      onClick={() => handleView(collaborator.id)}
                      className={styles.iconButton}
                    >
                      <img
                        src="/icon-view.png"
                        alt="Ver"
                        className={styles.icon}
                      />
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={styles.iconButton}
                    >
                      <img
                        src="/icon-edit.png"
                        alt="Editar"
                        className={styles.icon}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(collaborator.id)}
                      className={styles.iconButton}
                    >
                      <img
                        src="/icon-delete.png"
                        alt="Excluir"
                        className={styles.icon}
                      />
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

      {/* Modal para Adicionar Colaborador */}
      <ModalAddCollaborator
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Fecha o modal
        onSave={handleAddCollaborator} // Adiciona o colaborador
      />

      <ModalEditCollab
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEditCollab} // Edita o colaborador
      />
    </div>
  );
}
