interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
  matricula: string;
  dependents: DependentProps[];
}