import React, { useState } from "react";

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
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div className="card-items__group-items__item">
      <div className="card-items__group-items__item__g1">
        <img src="/public/box.png" alt="" className="img-produto" />
      </div>

      <div className="card-items__group-items__item__g2">
        <h3 className="item-title">{description}</h3>
        <p className="item-ean">
          Código de barras: <span>{ean}</span>
        </p>
        <button
          className="btn-copy"
          onClick={handleCopy}
          style={{ color: copied ? "green" : "#66788b" }}
        >
          {copied ? (
            <>
              Copiado com sucesso! <i className="bi bi-check-circle-fill"></i>
            </>
          ) : (
            <>
              Copiar id do item <i className="bi bi-copy"></i>
            </>
          )}
        </button>
        <p className="discr">Descrição</p>
      </div>

      <div className="card-items__group-items__item__g3">
        <p className="item-text">
          Taxa ICMS de Entrada: <span>{imc_in}%</span>
        </p>
        <p className="item-text">
          taxa ICMS de Saída: <span>{imc_out}%</span>
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
        <p className="discr">Custos</p>
      </div>
    </div>
  );
};

export default Item;
