"use client";

import React from "react";
import styles from "@/styles/TextInput.module.css";

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  value,
  name,
  placeholder,
  onChange,
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input}
          name={name}
          required
        />
        {id === "password" && toggleShowPassword && (
          <img
            src={showPassword ? "/versenha.png" : "/fechar-olho.png"}
            alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className={styles.icon}
            onClick={toggleShowPassword}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;