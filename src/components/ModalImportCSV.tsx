"use client";
import React, { useState } from "react";
import styles from "@/styles/ModalImportCSV.module.css";
import CustomButton from "@/components/CustomButton";

interface ModalImportCSVProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, type: string) => void;
}

const ModalImportCSV: React.FC<ModalImportCSVProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState("collaborators");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrorMessage("Selecione um arquivo CSV primeiro.");
      return;
    }
    onUpload(file, importType);
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Importar Dados</h2>
        <p>Selecione um arquivo CSV e escolha o tipo de importação.</p>

        <input type="file" accept=".csv" onChange={handleFileChange} className={styles.fileInput} />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <div className={styles.buttonContainer}>
          <CustomButton text="Cancelar" onClick={onClose} color="danger" />
          <CustomButton text="Importar" onClick={handleUpload} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default ModalImportCSV;
