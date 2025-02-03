import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base do backend
  timeout: 15000, // Tempo limite para as requisições (em milissegundos)
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Requisição enviada:', config);
      return config;
    },
    (error) => {
      console.error('Erro na requisição:', error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Resposta recebida:', response);
      return response;
    },
    (error) => {
      console.error('Erro na resposta:', error);
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;