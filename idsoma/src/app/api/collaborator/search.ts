import axiosInstance from "../axiosInstance";

export const listCollaboratorsByName = async (name: string) => {
  try {
    const response = await axiosInstance.get('/collaborator/search-name', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colaboradores por nome:', error);
    throw error;
  }
};

export const listCollaboratorsByCPF = async (cpf: string) => {
  try {
    const response = await axiosInstance.get('/collaborator/search-cpf', {
      params: { cpf },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colaborador por CPF:', error);
    throw error;
  }
};
