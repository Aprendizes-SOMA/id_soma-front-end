"use client";
import React, { useState } from "react";
import styles from '../../styles/loginAdmin.module.css'; 
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

const LoginAdmin = () => {
    const router = useRouter(); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 


  const validCredentials = {
    username: "admin",
    password: "1234",
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 

   
    if (username === validCredentials.username && password === validCredentials.password) {
      router.push("/listCollaborators"); 
    } else {
      setErrorMessage("Usuário ou senha inválidos!");
    }
  };
    return (
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src="/logo.png" alt="SOMA Verificação" />
          </div>
          <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
          <h2 className={styles.subtitle}>LOGIN ADMINISTRADOR</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Usuário</label>
              <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className={styles.input}
                required
              />
            </div>

          
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            ENTRAR
          </button>
        </div>
          </form>
        </div>
    );
};

export default LoginAdmin;