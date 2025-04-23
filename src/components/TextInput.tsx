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
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.iconButton}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.5C7.5 4.5 3.6 7.3 2 12c1.6 4.7 5.5 7.5 10 7.5s8.4-2.8 10-7.5c-1.6-4.7-5.5-7.5-10-7.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2 4.27L3.28 3 21 20.72 19.73 22l-3.02-3.02C15.2 19.6 13.64 20 12 20c-4.5 0-8.4-2.8-10-7.5a12.21 12.21 0 0 1 3.2-4.73L2 4.27zm7.13 7.14a3 3 0 0 0 4.46 4.46l-4.46-4.46zm2.53-5.91c4.5 0 8.4 2.8 10 7.5a12.18 12.18 0 0 1-2.24 3.34l-1.42-1.42a9.7 9.7 0 0 0 1.66-2.1C17.5 8.6 14.5 6.5 12 6.5c-.68 0-1.33.1-1.95.27l-1.58-1.58C9.56 4.76 10.76 4.5 12 4.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
