"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/page.module.css";
import { listCollaboratorsByCPF } from "../app/api/collaborator/index"; // Importa a função de busca por CPF

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
          onChange={(e) => setCpf(e.target.value)}
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