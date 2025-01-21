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
      {
        id: 1,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 2,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 3,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 4,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 5,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 6,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 7,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 8,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 9,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 10,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 11,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 12,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 13,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 14,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 15,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 16,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 17,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 18,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 19,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 20,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 21,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      }, 
      {
        id: 22,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 23,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 24,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 25,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 26,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 27,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 28,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 29,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
      {
        id: 30,
        name: "Francisco Lima",
        cpf: "11122233345",
        role: "Coordenador",
      },
    ]);
  }, []);

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
            />
          </div>
        </div>
        <button className={styles.addButton}>ADICIONAR NOVO COLABORADOR</button>
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
            {collaborators.map((collaborator) => (
              <tr key={collaborator.id}>
                <td>{collaborator.name}</td>
                <td>{collaborator.cpf}</td>
                <td>{collaborator.role}</td>
                <td className={styles.dependentsActions}>
                  <img src="/icon-view.png" alt="Ver" className={styles.icon} />
                  <img
                    src="/icon-edit.png"
                    alt="Editar"
                    className={styles.icon}
                  />
                  <img
                    src="/icon-delete.png"
                    alt="Excluir"
                    className={styles.icon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
