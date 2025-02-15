import axios, { AxiosInstance } from "axios";

// Definindo a configuração da instância do Axios com o tipo AxiosInstance
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/gic/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000, // Definindo um timeout de 20 segundos
});

export default api;
