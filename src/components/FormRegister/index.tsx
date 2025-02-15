import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import useApi from "../../hooks/useApi";
import { Dropdown } from "primereact/dropdown";
import { formattedValues } from "../../utils/validation/validations";
import { alert } from "notie";

import {
  limitWord,
  calculateTotCust,
  formatCurrency,
  validate,
  FormValues,
} from "../../utils/validation/validations";

const FormRegister = () => {
  const {
    data,
    error,
    loading: loadingInsertItem,
    requestAPI: requestAPIInsertItem,
  } = useApi("/items", "POST");

  const formik = useFormik<FormValues>({
    initialValues: {
      description: "",
      ean: "",
      ncm: "",
      icmsIn: "",
      icmsOut: "",
      cst: "",
      cfop: "",
      valorUnit: "",
      comission: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Formata os dados de acordo com o formato esperado pela API
      const formattedData = formattedValues(values);

      try {
        const result = await requestAPIInsertItem(formattedData);
        if (result) {
          alert({
            type: 1, 
            text: "Item cadastrado com sucesso!",
            stay: false, 
            time: 2, 
            position: "top",
          });
          resetForm();
        } else {
          alert({
            type: 3, 
            text: "Erro ao tentar inserir item!",
            stay: false, 
            time: 2, 
            position: "top",
          });
        }
      } catch (error) {
        alert({
          type: 3, 
          text: "Erro ao tantar inserir o item!",
          stay: false, 
          time: 2, 
          position: 'top'
        })
        if (error.response) {
          console.log("Resposta da API:", error.response.data); // Log do erro
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    data: dataCsts,
    error: errorCsts,
    loading: loadingCsts,
    requestAPI: requestApiCsts,
  } = useApi("/csts", "GET");
  const {
    data: dataCfops,
    error: errorCfops,
    loading: loadingCfops,
    requestAPI: requestApiCfops,
  } = useApi("/cfops", "GET");

  useEffect(() => {
    requestApiCsts();
    requestApiCfops();
  }, []);

  // Estado para o total de custo
  const [totalCust, setTotalCust] = useState(0);

  // useEffect que calcula e atualiza o total de custo.
  useEffect(() => {
    setTotalCust(
      calculateTotCust(
        Number(formik.values.valorUnit),
        Number(formik.values.icmsIn),
        Number(formik.values.icmsOut),
        Number(formik.values.comission)
      )
    );
  }, [
    formik.values.valorUnit,
    formik.values.icmsIn,
    formik.values.icmsOut,
    formik.values.comission,
  ]);

  // Requizição par aos NCMs
  const [selectNCN, setSelectNCM] = useState(null);

  const {
    data: dataNcms,
    error: errorNcms,
    loading: loadingNcms,
    requestAPI: requestApiNcms,
  } = useApi(`/ncms/${selectNCN}`, "GET");

  // Adicione um estado para armazenar o erro de NCM
  const [errorNcmRequest, setErrorNcmRequest] = useState(null);

  // Função para resetar erro quando um novo NCM for selecionado
  const handleSelectNCM = (value) => {
    setSelectNCM(value);
    setErrorNcmRequest(null); // Limpa o erro para permitir novas tentativas
  };

  useEffect(() => {
    if (selectNCN) {
      requestApiNcms().catch((error) => setErrorNcmRequest(error));
    }
  }, [selectNCN]);

  const ncms = selectNCN
    ? Array.isArray(dataNcms)
      ? dataNcms.map((item) => ({
          name: item.codncm + " - " + limitWord(item.nomencm),
          code: item.codncm,
        }))
      : []
    : null;

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2 className="form__title">Cadastro de Itens</h2>
      <div className="form__group-inputs">
        <div className="form__group-inputs__g1">
          <label>
            <span>Descrição:</span>
            <input
              className="input"
              type="text"
              name="description"
              id="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="* Ex: Smartphone Sansung S20..."
            />
            {formik.touched.description && formik.errors.description ? (
              <span className="text-error">{formik.errors.description}</span>
            ) : null}
          </label>
          <label>
            <span>Código de Barras (EAN):</span>
            <input
              className="input"
              type="text"
              name="ean"
              id="ean"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ean}
              placeholder="Ex: 098463764736"
            />
            {formik.touched.ean && formik.errors.ean ? (
              <span className="text-error">{formik.errors.ean}</span>
            ) : null}
          </label>

          <label>
            <span>NCM:</span>
            <Dropdown
              value={selectNCN}
              onChange={(e) => {
                handleSelectNCM(e.value);
                formik.setFieldValue("ncm", e.value.code);
                setErrorNcmRequest(null);
              }}
              onBlur={() => formik.setFieldTouched("ncm", true)}
              options={ncms}
              optionLabel="name"
              editable
              placeholder="Busque um NCM"
              className="input-drop"
              emptyMessage={
                loadingNcms ? (
                  <p className="message-empty-loading">Carregando...</p>
                ) : errorNcmRequest ? (
                  <p className="message-empty-error">Erro ao buscar NCMs</p>
                ) : (
                  <p className="message-empty">Nenhum NCM encontrado</p>
                )
              }
            />
            {formik.touched.ncm && formik.errors.ncm ? (
              <span className="text-error">{formik.errors.ncm}</span>
            ) : null}
          </label>
        </div>

        <div className="form__group-inputs__g2">
          <label>
            <span>Taxa ICMS de entrada (%):</span>
            <input
              className="input"
              type="text"
              name="icmsIn"
              id="icmsIn"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.icmsIn}
              placeholder="* Ex: 20.5"
            />
            {formik.touched.icmsIn && formik.errors.icmsIn ? (
              <span className="text-error">{formik.errors.icmsIn}</span>
            ) : null}
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input
              className="input"
              type="text"
              name="icmsOut"
              id="icmsOut"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.icmsOut}
              placeholder="Ex: 30"
            />
            {formik.touched.icmsOut && formik.errors.icmsOut ? (
              <span className="text-error">{formik.errors.icmsOut}</span>
            ) : null}
          </label>

          <label>
            <span>CST:</span>
            <select
              className="input"
              name="cst"
              id="cst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cst}
              disabled={loadingCsts ? true : false}
            >
              <option value="">
                {loadingCsts ? (
                  <span className="loading-text">Carregando...</span>
                ) : errorCsts ? (
                  <span className="loading-text">Erro na busca de CSTs</span>
                ) : (
                  "Selecione"
                )}
              </option>
              {dataCsts &&
                dataCsts.map((item, i) => (
                  <option key={item.codcst} value={item.codcst}>
                    {item.codcst} - {limitWord(item.descricao)}
                  </option>
                ))}
            </select>
            {formik.touched.cst && formik.errors.cst ? (
              <span className="text-error">{formik.errors.cst}</span>
            ) : null}
          </label>

          <label>
            <span>CFOP:</span>
            <select
              className="input"
              name="cfop"
              id="cfop"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cfop}
              disabled={loadingCfops ? true : false}
            >
              <option value="">
                {loadingCfops ? (
                  <span className="loading-text">Carregando...</span>
                ) : errorCfops ? (
                  <span className="loading-text">Erro na busca de CFOPs</span>
                ) : (
                  "Selecione"
                )}
              </option>
              {dataCfops &&
                dataCfops.map((item, i) => (
                  <option key={item.codcfop} value={item.codcfop}>
                    {item.codcfop} - {limitWord(item.descricaocfop)}
                  </option>
                ))}
            </select>
            {formik.touched.cfop && formik.errors.cfop ? (
              <span className="text-error">{formik.errors.cfop}</span>
            ) : null}
          </label>
        </div>
        <div className="form__group-inputs__g3">
          <label>
            <span>Valor unitário</span>
            <input
              className="input"
              type="text"
              name="valorUnit"
              id="valorUnit"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.valorUnit}
              placeholder="* Ex: 3000"
            />
            {formik.touched.valorUnit && formik.errors.valorUnit ? (
              <span className="text-error">{formik.errors.valorUnit}</span>
            ) : null}
          </label>
          <label>
            <span>Comissão para o vendedor (%):</span>
            <input
              className="input"
              type="text"
              name="comission"
              id="comission"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comission}
              placeholder="* Ex: 15"
            />
            {formik.touched.comission && formik.errors.comission ? (
              <span className="text-error">{formik.errors.comission}</span>
            ) : null}
          </label>
          <label>
            <span>Valor total de custo:</span>
            <input
              className="input"
              type="text"
              name=""
              id=""
              placeholder="Calculado automáticmanete"
              disabled
              value={formatCurrency(totalCust)}
            />
          </label>
          <input
            disabled={loadingInsertItem ? true : false}
            type="submit"
            value={loadingInsertItem ? "Inserindo..." : "Cadastrar Novo Item"}
          />
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
