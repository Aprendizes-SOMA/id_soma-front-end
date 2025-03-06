"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/collaborator.module.css";
import { listCollaboratorsByCPF } from "../api/collaborator/index";

import Image from 'next/image'

interface Dependent {
  name: string;
  parentesco: string;
}
interface CollaboratorData {
  name: string;
  cpf: string;
  role: string;
  matricula: string;
  Dependents?: Dependent[];
}

export default function Collaborator() {
  const [collaboratorData, setCollaboratorData] = useState<CollaboratorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollaboratorData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cpf = urlParams.get("cpf");

      if (!cpf) {
        setError("CPF não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        const data: CollaboratorData | null = await listCollaboratorsByCPF(cpf);

        if (!data) {
          setError("Colaborador não encontrado.");
        } else {
          setCollaboratorData(data);
        }
      } catch (err) {
        console.error("Erro ao buscar colaborador:", err);
        setError("Erro ao buscar dados do colaborador. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollaboratorData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="./logo.png" alt="SOMA Verificação" width={30} height={30} />
        </div>
        <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="SOMA Verificação" width={30} height={30} />
        </div>
        <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
        <p className={styles.error}>{error}</p>
        <button
          type="button"
          className={styles.button}
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="SOMA Verificação" width={30} height={30} />
      </div>
      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
      <h2 className={styles.successMessage}>
        Verificação Concluída!{" "}
        <Image src="/successmark.png" alt="Verificação Concluída" width={30} height={30} />
      </h2>
      <div className={styles.collaboratorTitle}>
        <h2 className={styles.sectionTitle}>Dados do Colaborador</h2>
      </div>
      <div className={styles.collaboratorData}>
        <p>
          <strong>Nome:</strong> {collaboratorData?.name}
        </p>
        <p>
          <strong>CPF:</strong> {collaboratorData?.cpf}
        </p>
        <p>
          <strong>Cargo:</strong> {collaboratorData?.role}
        </p>
        <p>
          <strong>Matrícula:</strong> {collaboratorData?.matricula}
        </p>
      </div>
      <div className={styles.dependentsTitle}>
        <h2 className={styles.sectionTitle}>Dados dos Dependentes</h2>
      </div>
      <div className={styles.dependentsSection}>
        {collaboratorData?.Dependents && collaboratorData.Dependents.length > 0 ? (
          collaboratorData.Dependents.map((dependent, index) => (
            <div key={index} className={styles.dependentRow}>
              <p>
                <strong>Nome:</strong> {dependent.name}
              </p>
              <p>
                <strong>Parentesco:</strong> {dependent.parentesco}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum dependente cadastrado.</p>
        )}
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => window.history.back()}
      >
        Voltar
      </button>
    </div>
  );
}
