import axiosInstance from '../axiosInstance';

// Criar um novo colaborador
export const addCollaborator = async (data: { name: string; CPF: string; adminId: number; cargo: string }) => {
  try {
    const response = await axiosInstance.post('/collaborator', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar colaborador:', error);
    throw error;
  }
};

// Listar todos os colaboradores
export const listCollaborators = async () => {
  try {
    const response = await axiosInstance.get('/collaborator');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    throw error;
  }
};

// Atualizar um colaborador existente
export const updateCollaborator = async (id: number, data: { name?: string; CPF?: string; cargo?: string }) => {
  try {
    const response = await axiosInstance.put(`/collaborator/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    throw error;
  }
};

// Excluir um colaborador
export const deleteCollaborator = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/collaborator/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar colaborador:', error);
    throw error;
  }
};

// Obter um colaborador pelo ID
export const getCollaboratorById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/collaborator/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colaborador por ID:', error);
    throw error;
  }
};