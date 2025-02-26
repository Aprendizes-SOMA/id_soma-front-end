"use client";
import React, { useState } from "react";
import styles from "@/styles/loginAdmin.module.css";
import { useRouter } from "next/navigation";

import { loginAdmin } from "@/app/api/admin/index";

import TextInput from "@/components/TextInput";
import CustomButton from "@/components/CustomButton";

const LoginAdmin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await loginAdmin({ username, password });
      router.push("/listCollaborators");
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="SOMA Verificação" />
        </div>
        <h1 className={styles.title}>SOMA verificação</h1>
        <h2 className={styles.subtitle}>Login do Administrador</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            label="Usuário"
            id="username"
            type="text"
            value={username}
            placeholder="Digite seu usuário"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Senha"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.buttonContainer}>
            <CustomButton type="submit" text="Entrar" color="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
