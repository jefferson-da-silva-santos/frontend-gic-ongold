import { useState } from "react"
import api from "../api/api";

const useApi = (endpoint, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const requestAPI =  async () => {
    setLoading(true);
    try {
      const response = await api({
        method,
        url: endpoint,
        data: body
      });
      setData(response.data);
    } catch (error) {
      setError(error.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return {data, error, loading, requestAPI};
}

export default useApi;