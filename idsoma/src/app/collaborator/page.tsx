"use client";

import styles from "../../styles/collaborator.module.css";
import Button from "../../components/Button"

export default function Collaborator() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="SOMA Verificação" />
      </div>
      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>

      <h2 className={styles.successMessage}>
        Verificação Concluída!{" "}
        <img src="/successmark.png" alt="Verificação Concluída" />
      </h2>

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

      <Button href="/" content="Voltar" />
    </div>
  );
}
