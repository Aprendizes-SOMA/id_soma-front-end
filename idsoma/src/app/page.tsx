import Image from "next/image";
import Link from "next/link";
import styles from "../styles/page.module.css";
import Button from "../components/Button"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={80} height={80} />
      </div>

      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
      <p className={styles.description}>
        Bem-vindo ao sistema de verificação da SOMA! Confirme sua participação como colaborador e comprove sua conexão conosco.
      </p>

      <form className={styles.form}>
        <label htmlFor="cpf" className={styles.label}>CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="Digite seu CPF"
          className={styles.input}
        />
      </form>
      
      <Button href="/collaborator" type="submit" content="Verificar" />
    </div>
  );
}
