import axiosInstance from '../axiosInstance';

export const loginAdmin = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data; // Retorna o token JWT
    
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await axiosInstance.post('/admin/logout');
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};