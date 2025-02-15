import { useState } from "react";
import api from "../api/api";
import { AxiosResponse } from "axios";

/**
 * Interface para a configuração da requisição à API do backend
 */
interface ApiConfig {
  method: string;
  url: string;
  data?: any;
}

/**
 * Interface para o retorno do hook useApi (data, error, loading e requestAPI)
 */
interface UseApiReturn {
  data: any;
  error: string | null;
  loading: boolean;
  requestAPI: (requestBody?: any) => Promise<any>;
}

/**
 * Hook para realizar requisições à API do backend de forma simplificada
 * @param endpoint Endpoint da API a ser chamado (Ex: "/items")
 * @param method Método HTTP da requisição (GET, POST, PUT, DELETE)
 * @returns Objeto com os dados da requisição (data, error, loading) e a função para realizar a requisição (requestAPI)
 * @example const { data, error, loading, requestAPI } = useApi("/items", "GET");
 */
const useApi = (endpoint: string, method: string = "GET"): UseApiReturn => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestAPI = async (requestBody: any = null): Promise<any> => {
    setLoading(true);
    try {
      const config: ApiConfig = {
        method,
        url: endpoint,
      };

      // Para DELETE, evitar passar o corpo da requisição
      if (method !== 'DELETE' && requestBody) {
        config.data = requestBody;
      }

      const response: AxiosResponse<any> = await api(config);
      setData(response.data);
      return response.data;
    } catch (error: any) {
      setError(error.message || "Erro desconhecido");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, requestAPI };
};

export default useApi;
