import apiRequest from "../../utils/api/baseRequest";
import { useState, useEffect } from "react";
import React from "react";

const FormEdition = ({
  handleSubmitEdit,
  handleSubmitDelete,
  changeMessage,
  identify,
  setIdentify,
  handleSubmitRegister,
  ncm,
  setNcm,
  cst,
  setCst,
  cfop,
  setCfop,
  description,
  setDescription,
  ean,
  setEan,
  icmsIn,
  setIcmsIn,
  icmsOut,
  setIcmsOut,
  valueUnit,
  setValueUnit,
  comission,
  setComission,
  totalCusto,
  setTotalCusto,
  cleanState,
  setCriado_em,
}) => {

  const handleSearchItem = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `http://localhost:3000/api/gic/items/id/${identify}`
    );

    if (result.error) {
      changeMessage("Nenhum item encontrado com este id!", "rgb(255, 95, 95");
      return;
    }

    const data = result[0];
    setDescription(data.descricao);
    setValueUnit(data.valor_unitario);
    setIcmsIn(data.taxa_icms_entrada);
    setIcmsOut(data.taxa_icms_saida);
    setComission(data.comissao);
    setNcm(data.ncm);
    setCfop(data.cfop);
    setCst(data.cst);
    setEan(data.ean);
    setTotalCusto(data.totalCusto);
    setCriado_em(data.criado_em);
  };

  return (
    <form
      className="form-register"
      onSubmit={handleSubmitEdit}
    >
      <h2 className="form-register__title">
       Edição de Itens
      </h2>
      <div className="form-register__group-inputs">
          <div className="form-register__group-inputs__g0">
            <input
              type="number"
              min={0}
              value={identify}
              onChange={(e) => {
                if (e.target.value === "0" || e.target.value === "") {
                  setIdentify("");
                  cleanState();
                }
                setIdentify(e.target.value.toString());
              }}
              name=""
              id="id"
              placeholder="* Ex: 89"
            />
            <button onClick={handleSearchItem}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        <div className="form-register__group-inputs__g1">
          <label>
            <span>Descrição:</span>
            <input
              type="text"
              name="desc"
              id="desc"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder=""
            />
          </label>
          <label>
            <span>Código de Barras (EAN):</span>
            <input
              type="number"
              min={0}
              name="ean"
              id="ean"
              required
              value={ean}
              onChange={(e) => {
                setEan(e.target.value);
              }}
              placeholder=""
            />
          </label>
            <label>
              <span>NCM:</span>
              <input
                type="text"
                name="ncm"
                id="ncm"
                value={ncm === 0 ? "" : ncm}
                disabled
              />
            </label>
        </div>

        <div className="form-register__group-inputs__g2">
          <label>
            <span>Taxa ICMS de entrada (%):</span>
            <input
              required
              type="text"
              name="icms-in"
              id="icms-in"
              value={icmsIn}
              onChange={(e) => setIcmsIn(e.target.value)}
              placeholder=""
            />
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input
              required
              type="text"
              name="icms-out"
              id="icms-out"
              value={icmsOut}
              onChange={(e) => setIcmsOut(e.target.value)}
              placeholder=""
            />
          </label>
            <label>
              <span>CST:</span>
              <input
                type="text"
                name="cst"
                id="cst"
                value={cst === 0 ? "" : cst}
                disabled
              />
            </label>
            <label>
              <span>CFOP:</span>
              <input
                type="text"
                name="cfop"
                id="cfop"
                value={cfop === 0 ? "" : cfop}
                disabled
              />
            </label>
        </div>
        <div
          className="form-register__group-inputs__g3"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 10em 10em" }}
        >
          <label>
            <span>Valor unitário</span>
            <input
              required
              type="text"
              name="value_unit"
              id="value_unit"
              value={valueUnit}
              onChange={(e) => setValueUnit(e.target.value)}
              placeholder=""
            />
          </label>
          <label>
            <span>Comissão para o vendedor (%):</span>
            <input
              required
              type="text"
              name="comissao"
              id="comissao"
              value={comission}
              onChange={(e) => setComission(e.target.value)}
              placeholder=""
            />
          </label>
          <label>
            <span>Valor total de custo:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Calculado automáticmanete"
              value={totalCusto === "R$ 0" ? "" : totalCusto}
              disabled
            />
          </label>
          <input
            type="submit"
            value="Atualizar Item"
          />
            <input
              style={{ backgroundColor: "rgb(255, 109, 109)", color: "white" }}
              type="submit"
              value="Deletar item"
              onClick={handleSubmitDelete}
            />
        </div>
      </div>
    </form>
  );
};

export default FormEdition;
