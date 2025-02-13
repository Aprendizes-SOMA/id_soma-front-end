import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean; // Controle de visibilidade do modal
  onClose: () => void; // Função para fechar o modal
  onSave: (data: { name: string; cpf: string; role: string }) => void; // Callback para salvar dados
  children?: ReactNode; // Conteúdo do modal (opcional)
}
