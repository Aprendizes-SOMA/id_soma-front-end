// pages/users/Collaborators.js
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
      <h3 className="collaboratorDatah3">Dados do Colaborador</h3>
      <div className={styles.collaboratorData}>
        
        <p>
          <strong>Nome:</strong> João Silva
        </p>
        <p>
          <strong>Cargo:</strong> Analista de Sistemas
        </p>
      </div>

      {/* Dados dos Dependentes */}
      <div className={styles.dependentsSection}>
        <h3>Dados dos Dependentes</h3>
        <div className={styles.dependentRow}>
          <p>Nome: Dependente 1</p>
          <p>Parentesco: Filho(a)</p>
        </div>
        <div className={styles.dependentRow}>
          <p>Nome: Dependente 2</p>
          <p>Parentesco: Filho(a)</p>
        </div>
        <div className={styles.dependentRow}>
          <p>Nome: Dependente 3</p>
          <p>Parentesco: Cônjuge</p>
        </div>
      </div>

      {/* Botão Voltar */}
      <button className={styles.button}>VOLTAR</button>
    </div>
  );
}