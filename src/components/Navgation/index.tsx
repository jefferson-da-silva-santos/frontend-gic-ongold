import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Navgation = ({
  setItems,
  currentPage,
  setCurrentPage,
  isMenuMobileVisible,
  setIsMenuMobileVisible,
  itensPerPage,
  setTotalPaginas,
}) => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const {
    data: dataSearch,
    error: errorSearch,
    loading: loadingSearch,
    requestAPI: requestSearch,
  } = useApi(`/items/search?description=${description}&page=${currentPage}&limit=${itensPerPage}`, "GET");

  // Função para fazer a busca
  const searchItems = async () => {
    try {
      const result = await requestSearch();
      if (result) {
        setItems(result.items);
        setTotalPaginas(result.totalPages);
        
      } else {
        console.log("Erro na busca");
      }
    } catch (error) {
      return;
    }
  };

  // A cada mudança no campo de descrição, chamamos a busca.
  useEffect(() => {
    if (description.trim() === "") {
      console.log('Agora entrou na lista vazia');
      setItems([]); // Caso a descrição esteja vazia, limpamos a lista
    } else {
      console.log('Pesquisa realizada');
      searchItems(); // Caso contrário, realizamos a busca
    }
  }, [description, setItems]); // O efeito depende da mudança em 'description'

  // Função que altera o estágio para 'list' quando Enter é pressionado
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchItems(); // Garante que a lista estará filtrada ao mudar para 'list'
    }
  };

  const {
    data: dataItems,
    loading: loadingItems,
    requestAPI: requestApiItems,
  } = useApi(`/items?page=${currentPage}&limit=${itensPerPage}`);

  // Função para buscar os dados
  async function fetchData() {
    try {
      await requestApiItems();
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [description]);

  return (
    <nav className="navigation">
      <button
        onClick={() => setIsMenuMobileVisible(!isMenuMobileVisible)}
        className="navigation__menu"
      >
        <i className="bi bi-list"></i>
      </button>
      <button className="navigation__btn">
        <i className="bi bi-search"></i>
      </button>
      <input
        onClick={() => {
          navigate("/");
          setCurrentPage(1);
        }}
        onChange={(e) => {
          const value = e.target.value;
          if (value.trim() === "") {
            setItems(dataItems.items); // Limpa a lista se estiver vazio
            setTotalPaginas(dataItems.totalPages)
          } else {
            setDescription(value); // Caso contrário, atualiza a descrição
          }
          setCurrentPage(1);
        }}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Pesquisar um item aqui..."
        className="navigation__input"
      />
    </nav>
  );
};

export default Navgation;
