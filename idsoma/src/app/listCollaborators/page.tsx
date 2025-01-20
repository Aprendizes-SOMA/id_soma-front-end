"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/ListCollaborators.module.css";

// Tipo para um colaborador
interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
}

export default function ListCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]); // Define o estado com um array de colaboradores

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
      {/* Linha Superior */}
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de Colaboradores</h1>
        <div className={styles.searchBar}>
          <div className={styles.searchInputContainer}>
            <img src="/lupa.png" alt="Pesquisar" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar"
              className={styles.searchInput}
            />
          </div>
        </div>
        <button className={styles.addButton}>ADICIONAR NOVO COLABORADOR</button>
      </div>

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
