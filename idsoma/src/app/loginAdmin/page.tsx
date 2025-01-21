import React from "react";
import styles from '../../styles/loginAdmin.module.css'; 
import Button from "../../components/Button";

const LoginAdmin = () => {
    return (
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src="/logo.png" alt="SOMA Verificação" />
          </div>
          <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
          <h2 className={styles.subtitle}>LOGIN ADMINISTRADOR</h2>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Usuário</label>
              <input
                id="username"
                type="text"
                placeholder="Digite seu usuário" 
                className={styles.input}
                required
              />
            </div>

           
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className={styles.input}
              />
            </div>

          
            <div className={styles.buttonContainer}>
               <Button href="/listCollaborators" type="submit" content="ENTRAR" />
            </div>
          </form>
        </div>
    );
};

export default LoginAdmin;