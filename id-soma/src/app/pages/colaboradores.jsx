"use client"; // Marca este componente como Client Component

import styles from "../styles/Collaborators.module.css";

export default function CollaboratorsPage() {

  return (
    <div className={styles.container}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="/logo.png" alt="SOMA Verificação" />
      </div>
      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>

      {/* Verificação Concluída */}
      <h2 className={styles.successMessage}>
        Verificação Concluída!{" "}
        <img src="/successmark.png" alt="Verificação Concluída" />
      </h2>

      {/* Dados do Colaborador */}
      <div className={styles.collaboratorTitle}>
        <h2 className={styles.sectionTitle}>Dados do Colaborador</h2>
      </div>
      <div className={styles.collaboratorData}>
        <p>
          <strong>Nome:</strong> João Silva
        </p>
        <p>
          <strong>Cargo:</strong> Analista de Sistemas
        </p>
      </div>

      {/* Dados dos Dependentes */}
      <div className={styles.dependentsTitle}>
        <h2 className={styles.sectionTitle}>Dados dos Dependentes</h2>
      </div>
      <div className={styles.dependentsSection}>
        <div className={styles.dependentRow}>
          <p>
            <strong>Nome: </strong>
            Dependente 1
          </p>
          <p>
            <strong>Parentesco:</strong> Filho(a)
          </p>
        </div>
        <div className={styles.dependentRow}>
          <p>
            <strong>Nome: </strong>
            Dependente 2
          </p>
          <p>
            <strong>Parentesco: </strong>Filho(a)
          </p>
        </div>
        <div className={styles.dependentRow}>
          <p>
            <strong>Nome: </strong>
            Dependente 3
          </p>
          <p>Parentesco: Cônjuge</p>
        </div>
      </div>

      {/* Botão Voltar */}
      <button className={styles.button}>
        VOLTAR
      </button>
    </div>
  );
}
