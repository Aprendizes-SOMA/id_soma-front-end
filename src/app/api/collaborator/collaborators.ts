import axiosInstance from '../axiosInstance';

export const addCollaborator = async (data: { name: string; cpf: string; adminId: number; role: string; matricula: string }) => {
  try {
    const response = await axiosInstance.post('/collaborator', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar colaborador:', error);
    throw error;
  }
};

export const listCollaborators = async () => {
  try {
    const response = await axiosInstance.get('/collaborator');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    throw error;
  }
};

export const updateCollaborator = async (id: number, data: { name?: string; cpf?: string; role?: string; matricula?: string }) => {
  try {
    const response = await axiosInstance.put(`/collaborator/${id}`, {
      name: data.name,
      cpf: data.cpf,
      role: data.role,
      matricula: data.matricula,
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    throw error;
  }
};

export const deleteCollaborator = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/collaborator/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar colaborador:', error);
    throw error;
  }
};

export const getCollaboratorById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/collaborator/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colaborador por ID:', error);
    throw error;
  }
};
