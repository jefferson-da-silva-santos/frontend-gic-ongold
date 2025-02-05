// Função pdrão para todas as requisições
const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

    return method === "GET" ? await response.json() : true;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
};

export default apiRequest;