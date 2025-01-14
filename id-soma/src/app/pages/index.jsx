import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="./logo.png" alt="logo" />
      </div>

      {/* Texto de boas-vindas */}
      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
      <p className={styles.description}>
        Bem-vindo ao sistema de verificação da SOMA! Confirme sua participação como colaborador e comprove sua conexão conosco.
      </p>

      {/* Formulário de CPF */}
      <form className={styles.form}>
        <label htmlFor="cpf" className={styles.label}>CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="Digite seu CPF"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>VERIFICAR</button>
      </form>
    </div>
  );
}