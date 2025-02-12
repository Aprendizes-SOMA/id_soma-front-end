"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/page.module.css";
import { listCollaboratorsByCPF } from "../app/api/collaborator/index"; // Importa a função de busca por CPF

// Função para formatar o CPF automaticamente
const formatCPF = (value: string): string => {
  // Remove tudo que não for número
  const cleanedValue = value.replace(/\D/g, "");

  // Aplica a máscara de CPF
  if (cleanedValue.length <= 3) {
    return cleanedValue;
  } else if (cleanedValue.length <= 6) {
    return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
  } else if (cleanedValue.length <= 9) {
    return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
  } else {
    return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;
  }
};

export default function Home() {
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado para indicar carregamento

  const handleSearchByCpf = async (event: React.FormEvent) => {
    event.preventDefault();
    if (cpf.trim() === "") {
      setError("Por favor, digite um CPF válido.");
      return;
    }
    setLoading(true); // Inicia o estado de carregamento
    setError(null); // Limpa qualquer erro anterior
    try {
      // Chama a API para verificar se o CPF existe
      const data = await listCollaboratorsByCPF(cpf);
      if (!data) {
        setError("Colaborador não encontrado.");
        setLoading(false); // Finaliza o estado de carregamento
        return;
      }
      // Redireciona para a página de colaborador com o CPF como parâmetro
      window.location.href = `/collaborator?cpf=${cpf}`;
    } catch (err) {
      console.error("Erro ao buscar colaborador:", err);
      setError("Erro ao buscar dados do colaborador. Tente novamente mais tarde.");
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={80} height={80} />
      </div>
      <h1 className={styles.title}>SOMA VERIFICAÇÃO</h1>
      <p className={styles.description}>
        Bem-vindo ao sistema de verificação da SOMA! Confirme sua participação
        como colaborador e comprove sua conexão conosco.
      </p>
      <form className={styles.form} onSubmit={handleSearchByCpf}>
        <label htmlFor="cpf" className={styles.label}>
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="Digite seu CPF"
          className={styles.input}
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))} // Formata o CPF automaticamente
          maxLength={14} // Limita o comprimento máximo do CPF formatado
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading} // Desabilita o botão enquanto estiver carregando
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export { formatCPF };