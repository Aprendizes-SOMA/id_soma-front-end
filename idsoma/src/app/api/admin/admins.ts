import axiosInstance from '../axiosInstance';

// Criar um novo admin
export const addAdmin = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/admin', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar admin:', error);
    throw error;
  }
};

// Atualizar um admin existente
export const updateAdmin = async (id: number, data: { username?: string; password?: string }) => {
  try {
    const response = await axiosInstance.put(`/admin/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar admin:', error);
    throw error;
  }
};

// Listar todos os admins
export const listAdmins = async () => {
  try {
    const response = await axiosInstance.get('/admin');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar admins:', error);
    throw error;
  }
};

// Excluir um admin
export const deleteAdmin = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar admin:', error);
    throw error;
  }
};