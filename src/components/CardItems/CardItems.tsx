import React, { useEffect, useState } from "react";
import Item from "../Item";
import useApi from "../../hooks/useApi";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CardItems = ({
  items,
  setItems,
  currentPage,
  setCurrentPage,
  itensPerPage,
  totalPaginas,
  setTotalPaginas,
}) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null); // Armazenar o id do item ativo

  const navigate = useNavigate();

  const openAutoEdit = (id: number) => {
    navigate(`/edition/${id}`);
  };

  const {
    data: dataItems,
    error: errorItems,
    loading: loadingItems,
    requestAPI: requestApiItems,
  } = useApi(`/items?page=${currentPage}&limit=${itensPerPage}`);

  // Função para buscar os dados
  async function fetchData() {
    try {
      const result = await requestApiItems();
      console.log(result);
      if (result) {
        setItems(result.items);
        setTotalPaginas(result.totalPages);
        console.log(totalPaginas);
        
      } else {
        console.log("Erro na busca");
      }
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [currentPage, itensPerPage]);

  // Função para lidar com o clique no item
  const handleItemClick = (id) => {
    setActiveItemId(id); // Atualiza o id do item clicado
  };

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
  };

  return (
    <section className="card-items">
      {items.length > 0 && (
        <>
          <p className="card-items__text">Lista de Itens</p>
          {loadingItems ? (
            <ThreeDot
              variant="bounce"
              color="#e6c241"
              size="medium"
              text=""
              textColor=""
              style={{ marginTop: "3rem" }}
            />
          ) : (
            <>
              <div className="card-items__group-items">
                {items &&
                  items.map((item) => {
                    return (
                      <Item
                        key={item.id}
                        id={item.id}
                        description={item.descricao}
                        v_unit={item.valor_unitario}
                        imc_in={item.taxa_icms_entrada}
                        imc_out={item.taxa_icms_saida}
                        cfop={item.cfop}
                        cms={item.comissao}
                        cst={item.cst}
                        ean={item.ean}
                        ncm={item.ncm}
                        vtc={item.totalCusto}
                        openAutoEdit={openAutoEdit}
                        activeItemId={activeItemId}
                        onItemClick={handleItemClick}
                      />
                    );
                  })}
              </div>
              <div className="group-pagination">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPaginas}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Stack>
              </div>
            </>
          )}
        </>
      )}
      {items.length === 0 && (
        <p className="alert-not-found">Nenhum item encontrado! 😐</p>
      )}
    </section>
  );
};

export default CardItems;
