import apiRequest from "../../utils/api/baseRequest";
import { useState, useEffect } from "react";
import React from "react";

const ModelForm = ({
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
  edit,
  cleanState,
  limitarPalavras,
  setCriado_em,
  calculateTotCust,
}) => {
  const [arrCst, setArrCst] = useState<{ codcst: string; descricao: string }[]>(
    []
  );
  const [arrCfop, setArrCfop] = useState<
    { codcfop: string; descricaocfop: string }[]
  >([]);
  const [arrNcm, setArrNcm] = useState<{ codncm: string; nomencm: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest("http://localhost:3000/api/gic/csts");
      if (data) setArrCst(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest("http://localhost:3000/api/gic/cfops");
      if (data) setArrCfop(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest("http://localhost:3000/api/gic/ncms");
      if (data) setArrNcm(data);
    };
    fetchData();
  }, []);

  const handleSearchItem = async (e) => {
    e.preventDefault();
    const result = await apiRequest(`http://localhost:3000/api/gic/items/id/${identify}`);

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

  if (!edit) {
    useEffect(() => {
      calculateTotCust();
    }, [valueUnit, icmsIn, icmsOut, comission]);
  }

  return (
    <form
      className="form-register"
      onSubmit={!edit ? handleSubmitRegister : handleSubmitEdit}
    >
      <h2 className="form-register__title">
        {edit ? "Edição de Itens" : "Cadastro de Itens"}
      </h2>
      <div className="form-register__group-inputs">
        {edit && (
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
        )}
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
              placeholder={!edit ? "* Ex: Smartphone Sansung S20..." : ""}
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
              placeholder={!edit ? "* Ex: 098463764736" : ""}
            />
          </label>
          {!edit && (
            <label>
              <span>NCM:</span>
              <select
                name=""
                id=""
                value={ncm}
                onChange={(e) => setNcm(e.target.value)}
              >
                <option value="0">Selecione</option>
                {arrNcm.map((value, i) => (
                  <option key={i} value={value.codncm}>
                    {value.codncm} - {limitarPalavras(value.nomencm)}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
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
          )}
        </div>

        <div className="form-register__group-inputs__g2">
          <label>
            <span>Taxa ICMS de entrada (%):</span>
            <input
              required
              type="number"
              name="icms-in"
              id="icms-in"
              value={icmsIn}
              onChange={(e) => setIcmsIn(e.target.value)}
              placeholder={!edit ? "* Ex: 20.5" : ""}
            />
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input
              required
              type="number"
              name="icms-out"
              id="icms-out"
              value={icmsOut}
              onChange={(e) => setIcmsOut(e.target.value)}
              placeholder={!edit ? "* Ex: 30" : ""}
            />
          </label>
          {!edit && (
            <label>
              <span>CST:</span>
              <select
                required
                name="cst"
                id="cst"
                value={cst}
                onChange={(e) => setCst(e.target.value)}
              >
                <option value="0">Selecione</option>
                {arrCst.map((value, i) => (
                  <option key={i} value={value.codcst}>
                    {value.codcst} - {limitarPalavras(value.descricao)}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
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
          )}
          {!edit && (
            <label>
              <span>CFOP:</span>
              <select
                required
                name="cfop"
                id="cfop"
                value={cfop}
                onChange={(e) => setCfop(e.target.value)}
              >
                <option value="0">Selecione</option>
                {arrCfop.map((value, i) => (
                  <option key={i} value={value.codcfop}>
                    {value.codcfop} - {limitarPalavras(value.descricaocfop)}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
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
          )}
        </div>
        <div
          className="form-register__group-inputs__g3"
          style={
            edit
              ? { gridTemplateColumns: "1fr 1fr 1fr 10em 10em" }
              : { gridTemplateColumns: "1fr 1fr 1fr 1fr" }
          }
        >
          <label>
            <span>Valor unitário</span>
            <input
              required
              type="text"
              min={0}
              name="value_unit"
              id="value_unit"
              value={valueUnit}
              onChange={(e) => setValueUnit(e.target.value)}
              placeholder={!edit ? "* Ex: 3000" : ""}
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
              placeholder={!edit ? "* Ex: 15" : ""}
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
            value={!edit ? "Cadastrar Novo Item" : "Atualizar Item"}
          />
          {edit && (
            <input
              style={{ backgroundColor: "rgb(255, 109, 109)", color: "white" }}
              type="submit"
              value="Deletar item"
              onClick={handleSubmitDelete}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default ModelForm;
