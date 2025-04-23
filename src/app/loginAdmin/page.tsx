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
      router.push("/verification/listCollaborators");
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <svg height={80} width={80} viewBox="0 0 550 313" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M181.73 23.3025L162.094 89.1008C162.094 89.1008 130.406 75.2381 99.8224 83.0276C99.8224 83.0276 78.1881 90.9327 87.2511 106.099C96.2979 121.266 151.049 124.995 151.049 124.995C151.049 124.995 108.057 176.898 103.217 186.651C103.217 186.651 34.1076 176.964 15.0233 149.437C15.0233 149.437 4.93705 139.188 0.373067 113.757C0.373067 113.757 -6.82211 57.0186 41.9849 32.4288C90.7919 7.83903 140.119 13.2026 181.73 23.3025Z" fill="black"/>
            <path d="M57.512 269.019C57.512 269.019 86.8287 210.449 91.3115 207.313C91.3115 207.313 54.5235 200.547 33.2629 184.688L4.271 248.175C4.25476 248.175 27.6106 263.804 57.512 269.019Z" fill="black"/>
            <path d="M236.791 276.544L351.345 14.0443H436.355L550 276.148L461.676 276.132L393.98 99.7289L391.089 99.7124L390.439 99.7289L324.253 276.544H236.791Z" fill="black"/>
            <path d="M393.818 139.568L332.18 312.785L456.284 313L393.818 139.568Z" fill="#F2A956"/>
            <path d="M262.826 24.5733C262.826 24.5733 129.139 103.162 50.1382 284.02C50.1382 284.02 69.7747 288.542 79.0975 288.196C88.4204 287.849 80.9329 215.449 262.826 24.5733Z" fill="#F2A956"/>
            <path d="M305.104 0L259.221 44.5257L267.098 49.2951L305.104 0Z" fill="#F2A956"/>
            <path d="M254.218 49.2953L224.983 82.6153L237.798 89.6291L262.827 54.2792L254.218 49.2953Z" fill="#F2A956"/>
            <path d="M219.054 90.6522L183.257 137.29L202.13 148.314L233.428 97.6166L219.054 90.6522Z" fill="#F2A956"/>
            <path d="M177.865 147.192C177.865 147.192 146.42 195.514 144.13 202.676L171.011 211.142C171.011 211.142 188.114 168.481 198.07 157.111L177.865 147.192Z" fill="#F2A956"/>
            <path d="M297.194 24.6394C297.194 24.6394 237.927 126.679 214.425 244.38C214.425 244.38 200.879 265.735 179.31 274.151C157.741 282.568 246.503 79.9086 297.194 24.6394Z" fill="#F2A956"/>
            <path d="M140.135 213.024C140.135 213.024 112.345 264.959 110.282 289.285C110.282 289.285 132.566 291.084 147.086 285.605C147.086 285.605 149.571 252.945 167.503 222.084L140.135 213.024Z" fill="#F2A956"/>
          </svg>
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
