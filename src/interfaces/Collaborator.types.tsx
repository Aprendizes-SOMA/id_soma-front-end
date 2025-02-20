interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
  matricula: string;
  dependents: Dependent[];
}

interface ModalCollaboratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; cpf: string; role: string; matricula: string }) => Promise<void>;
  title: string;
  initialData?: { name: string; cpf: string; role: string; matricula: string };
}
