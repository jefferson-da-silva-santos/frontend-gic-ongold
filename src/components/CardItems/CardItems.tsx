import React, { useEffect, useState } from "react";
import Item from "../Item";
import useApi from "../../hooks/useApi";
import { ThreeDot } from "react-loading-indicators";

/**
 * Interface para os itens retornados pela API do backend 
 */
interface ItemType {
  id: number;
  descricao: string;
  valor_unitario: number;
  taxa_icms_entrada: number;
  taxa_icms_saida: number;
  cfop: string;
  comissao: number;
  cst: string;
  ean: string;
  ncm: string;
  totalCusto: number;
}

const CardItems = ({ stage }) => {
  const [items, setItems] = useState<ItemType[]>([]);

  const {
    data: dataItems,
    error: errorItems,
    loading: loadingItems,
    requestAPI: requestApiItems,
  } = useApi("/items");

  // Função para buscar os dados
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestApiItems(); // Requisição para pegar os itens
        if (data) {
          setItems(data); // Atualiza os itens na UI
        }
      } catch (error) {
        console.error("Erro ao carregar os itens:", error); // Log do erro no console
      }
    }
    fetchData();
  }, [stage]);

  return (
    <section className="card-items">
      <p className="card-items__text">Lista de Itens</p>
      {loadingItems ? (
        <ThreeDot
          variant="bounce"
          color="#e6c241"
          size="medium"
          text=""
          textColor=""
          style={{marginTop: "3rem"}}
        />
      ) : (
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
                />
              );
            })}
        </div>
      )}
    </section>
  );
};

export default CardItems;
