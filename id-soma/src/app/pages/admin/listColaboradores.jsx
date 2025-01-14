"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/ListCollaborators.module.css";

export default function ListCollaborators() {
  const [collaborators, setCollaborators] = useState([]);

  // Simulação de dados para a lista de colaboradores
  useEffect(() => {
    setCollaborators([
      { id: 1, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
      { id: 2, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
      { id: 3, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
      { id: 4, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
      { id: 5, name: "Francisco Lima", cpf: "11122233345", role: "Coordenador" },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      {/* Título */}
      <h1 className={styles.title}>Lista de Colaboradores</h1>

      {/* Barra de Pesquisa */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pesquisar"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <img src="/search-icon.png" alt="Pesquisar" />
        </button>
      </div>

      {/* Botão Adicionar Colaborador */}
      <button className={styles.addButton}>ADICIONAR COLABORADOR</button>

      {/* Tabela de Colaboradores */}
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
          {collaborators.map((collaborator) => (
            <tr key={collaborator.id}>
              <td>{collaborator.name}</td>
              <td>{collaborator.cpf}</td>
              <td>{collaborator.role}</td>
              <td className={styles.dependentsActions}>
                <img src="/icon-view.png" alt="Ver" className={styles.icon} />
                <img src="/icon-edit.png" alt="Editar" className={styles.icon} />
                <img src="/icon-delete.png" alt="Excluir" className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
