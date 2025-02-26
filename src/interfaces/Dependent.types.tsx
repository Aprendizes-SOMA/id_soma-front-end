interface Dependent {
  collaboratorId: number;
  id: number;
  name: string;
  parentesco: string;
}

interface ModalDependentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dependents: Dependent[]) => void;
  initialDependents: Dependent[];
  collaboratorId: number;
}