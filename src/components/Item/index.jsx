import React from "react";

const Item = ({
  id,
  description,
  ean,
  imc_in,
  imc_out,
  ncm,
  cst,
  cfop,
  v_unit,
  cms,
  vtc,
  openAutoEdit,
  activeItemId,
  onItemClick,
}) => {

  const handleButtonEdit = (e) => {
    e.preventDefault();
    openAutoEdit(id);
  }

  const handleClick = () => {
    onItemClick(id); // Define o item como ativo
  };

  return (
    <div
    onClick={handleClick}
      className="card-items__group-items__item"
    >
      <button
        onClick={handleButtonEdit}
        className={`btn-edit-item ${activeItemId === id ? "" : "hidden-btn"}`}
      >
        <i className="bi bi-pen-fill"></i>
      </button>
      <div className="card-items__group-items__item__g1">
        <img src="/public/box.png" alt="" className="img-produto" />
      </div>

      <div className="card-items__group-items__item__g2">
        <h3 className="item-title">{description}</h3>
        <p className="item-ean">
          Código de barras: <span>{ean}</span>
        </p>
        <p className="discr">Descrição</p>
      </div>

      <div className="card-items__group-items__item__g3">
        <p className="item-text">
          Taxa ICMS de Entrada: <span>{imc_in}%</span>
        </p>
        <p className="item-text">
          Taxa ICMS de Saída: <span>{imc_out}%</span>
        </p>
        <p className="item-text">
          NCM: <span>{ncm}</span>
        </p>
        <p className="item-text">
          CST: <span>{cst}</span>
        </p>
        <p className="item-text">
          CFOP: <span>{cfop}</span>
        </p>
        <p className="discr">Tributação</p>
      </div>

      <div className="card-items__group-items__item__g4">
        <p className="item-text">
          Valor unitário: <span>{v_unit}</span>
        </p>
        <p className="item-text">
          Comissão para o Vendedor: <span>{cms}%</span>
        </p>
        <p className="item-text">
          Valor Total de Custo: <span>{vtc} R$</span>
        </p>
        <p className="discr discr-custos">Custos</p>
      </div>
    </div>
  );
};

export default Item;
