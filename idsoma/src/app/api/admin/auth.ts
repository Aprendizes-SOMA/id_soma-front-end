import axiosInstance from '../axiosInstance';

export const loginAdmin = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    const token = response.data.token;

    console.log("Token recebido:", token);

    if (token) {
      localStorage.setItem('adminToken', token);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await axiosInstance.post('/admin/logout');

    localStorage.removeItem('adminToken');

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};
