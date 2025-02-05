import axiosInstance from '../axiosInstance';

// Criar um novo dependente
export const addDependent = async (data: { name: string; parentesco: string; collaboratorId: number; adminId: number }) => {
  try {
    const response = await axiosInstance.post('/dependent', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar dependente:', error);
    throw error;
  }
};

// Listar todos os dependentes
export const listDependents = async () => {
  try {
    const response = await axiosInstance.get('/dependent');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar dependentes:', error);
    throw error;
  }
};

// Atualizar um dependente existente
export const updateDependent = async (id: number, data: { name?: string; parentesco?: string }) => {
  try {
    const response = await axiosInstance.put(`/dependent/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar dependente:', error);
    throw error;
  }
};

// Excluir um dependente
export const deleteDependent = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/dependent/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar dependente:', error);
    throw error;
  }
};