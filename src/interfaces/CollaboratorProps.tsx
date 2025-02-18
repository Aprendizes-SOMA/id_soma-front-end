interface Collaborator {
  id: number;
  name: string;
  cpf: string;
  role: string;
  dependents: DependentProps[];
}