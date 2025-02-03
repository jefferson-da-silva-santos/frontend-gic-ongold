import React from "react";
import Item from "../Item";

const CardItems = ({items}) => {
  console.log(items);
  
  return (
    <section className="card-items">
      <p className="card-items__text">Lista de Itens</p>
      <div className="card-items__group-items">
        {
          items.map(item => {
            return (
              <Item key={item.id} description={item.descricao} v_unit={item.valor_unitario} imc_in={item.taxa_icms_entrada} imc_out={item.taxa_icms_saida} cfop={item.cfop} cms={item.comissao} cst={item.cst} ean={item.ean} ncm={item.ncm} vtc={item.totalCusto} />
            )
          })
        }
      </div>
    </section>
  );
};

export default CardItems;
