import React from "react";

const ItemBin = ({
  description,
  ean,
  icms_in,
  icms_out,
  ncm,
  cst,
  cfop,
  v_unit,
  cms,
  vtc,
}) => {
  return (
    <div className="page-bin__group-items__item">
      <button className="btn-rm-bin-item">
        <i className="bi bi-arrow-counterclockwise"></i>
      </button>
      <div className="page-bin__group-items__item__g1">
        <img src="/public/box-bin.png" alt="" className="img-produto" />
      </div>

      <div className="page-bin__group-items__item__g2">
        <h3 className="item-title">{description}</h3>
        <p className="item-ean">
          Código de barras: <span>{ean}</span>
        </p>
        <p className="discr">Descrição</p>
      </div>

      <div className="page-bin__group-items__item__g3">
        <p className="item-text">
          Taxa ICMS de Entrada: <span>{icms_in}%</span>
        </p>
        <p className="item-text">
          Taxa ICMS de Saída: <span>{icms_out}%</span>
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

      <div className="page-bin__group-items__item__g4">
        <p className="item-text">
          Valor unitário: <span>{v_unit}</span>
        </p>
        <p className="item-text">
          Comissão para o Vendedor: <span>{cms}%</span>
        </p>
        <p className="item-text">
          Valor Total de Custo: <span>{vtc} R$</span>
        </p>
        <p className="discr">Custos</p>
      </div>
    </div>
  );
};

export default ItemBin;
