import React, { useEffect, useState } from "react";
import { baseRequest, baseRequestFilter } from "../../App";

const ModelForm = ({
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
  const [identify, setIdentify] = useState("");

  useEffect(() => {
    baseRequest("http://localhost:3000/api/gic/csts", setArrCst);
  }, []);

  useEffect(() => {
    baseRequest("http://localhost:3000/api/gic/cfops", setArrCfop);
  }, []);

  useEffect(() => {
    baseRequest("http://localhost:3000/api/gic/ncms", setArrNcm);
  }, []);

  const handleSearchItem = async (e) => {
    e.preventDefault();
    const result = await baseRequestFilter(
      `http://localhost:3000/api/gic/items/id/${identify}`
    );
    if (result) {
      console.log(result[0]);
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
    }
  };

  if (!edit) {
    useEffect(() => {
      calculateTotCust();
    }, [valueUnit, icmsIn, icmsOut, comission]);
  }

  // Função que calcula o total de custo
  const calculateTotCust = () => {
    const value = parseFloat(valueUnit) || 0;
    const entryIcms = parseFloat(icmsIn) || 0;
    const exitIcms = parseFloat(icmsOut) || 0;
    const commissionRate = parseFloat(comission) || 0;

    const totalCost =
      (entryIcms / 100 + exitIcms / 100 + commissionRate / 100) * value;
    setTotalCusto(parseFloat(totalCost.toFixed(2)));
  };

  return (
    <form className="form-register" onSubmit={!edit && handleSubmitRegister}>
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
                if (e.target.value === "0") {
                  setIdentify("");
                }
                setIdentify(e.target.value.toString());
                console.log(e.target.value);
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
                    {value.codncm} - {value.nomencm}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
            <label>
              <span>NCM:</span>
              <input type="text" name="ncm" id="ncm" value={ncm} disabled />
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
                    {value.codcst} - {value.descricao}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
            <label>
              <span>CST:</span>
              <input type="text" name="cst" id="cst" value={cst} disabled />
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
                    {value.codcfop} - {value.descricaocfop}
                  </option>
                ))}
              </select>
            </label>
          )}
          {edit && (
            <label>
              <span>CFOP:</span>
              <input type="text" name="cfop" id="cfop" value={cfop} disabled />
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
              type="number"
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
              type="number"
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
              value={totalCusto}
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
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default ModelForm;
