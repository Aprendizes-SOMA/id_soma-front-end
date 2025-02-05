import axiosInstance from '../axiosInstance';

// Buscar colaboradores por nome
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

// Buscar colaborador por CPF
export const listCollaboratorsByCPF = async (CPF: string) => {
  try {
    const response = await axiosInstance.get('/collaborator/search-cpf', {
      params: { CPF },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colaborador por CPF:', error);
    throw error;
  }
};