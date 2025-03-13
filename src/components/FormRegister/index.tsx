import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import useApi from "../../hooks/useApi";
import { Dropdown } from "primereact/dropdown";
import {
  formattedValues,
  validate,
  calculateTotCust,
  formatCurrency,
  limitWord,
  showAlert,
} from "../../utils/validation/validation";
import { FormValues } from "../../utils/validation/formValidation";

const FormRegister = () => {
  const {
    loading: loadingInsertItem,
    requestAPI: requestAPIInsertItem,
  } = useApi("/items", "POST");
  const [isEanExist, setIsEanExist] = useState(false);

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
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      // Formata os dados de acordo com o formato esperado pela API
      const formattedData = formattedValues(values);

      if (isEanExist) {
        return;
      }
      try {
        const result = await requestAPIInsertItem(formattedData);

        if (result) {
          showAlert(1, "Item cadastrado com sucesso!");
          setIsEanExist(false);
          setSelectNCM(null);
          resetForm();
        } else {
          showAlert(3, "Erro ao tentar inserir item!");
        }
      } catch (error) {
        showAlert(3, "Erro ao tentar inserir item!");
        if (error.response) {
          console.log("Resposta da API:", error.response.data); // Log do erro
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    requestAPI: requestApiEan,
  } = useApi(`/items?page=1&limit=4&field=ean&value=${formik.values.ean}`, "GET");

  async function fetchData() {
    try {
      const data = await requestApiEan();
      if (data.items.length > 0) {
        setIsEanExist(true);
      } else {
        setIsEanExist(false);
      }
    } catch (error) {
      setIsEanExist(false);
    }
  }
  
  useEffect(() => {
    // Verifica se o valor de 'ean' não é vazio antes de fazer a requisição
    if (formik.values.ean && formik.values.ean.length === 13) {
      fetchData();
    } else {
      setIsEanExist(false); // Reseta o estado de EAN se o campo estiver vazio
    }
  }, [formik.values.ean]);

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
  const [selectNCM, setSelectNCM] = useState(null);

  const {
    data: dataNcms,
    loading: loadingNcms,
    requestAPI: requestApiNcms,
  } = useApi(`/ncms/${selectNCM}`, "GET");

  // Adicione um estado para armazenar o erro de NCM
  const [errorNcmRequest, setErrorNcmRequest] = useState(null);

  // Função para resetar erro quando um novo NCM for selecionado
  const handleSelectNCM = (value) => {
    setSelectNCM(value);
    setErrorNcmRequest(null); // Limpa o erro para permitir novas tentativas
  };

  useEffect(() => {
    if (selectNCM) {
      requestApiNcms().catch((error) => setErrorNcmRequest(error));
    }
  }, [selectNCM]);

  const ncms = selectNCM
    ? Array.isArray(dataNcms)
      ? dataNcms.map((item) => ({
          idncm: item.idncm,
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
            {isEanExist && (
              <span className="text-error">
                O código de barras informado já existe!
              </span>
            )}
          </label>

          <label>
            <span>NCM:</span>
            <Dropdown
              value={selectNCM}
              onChange={(e) => {
                handleSelectNCM(e.value);
                formik.setFieldValue("ncm", e.value.idncm); // adicionando o id
                setErrorNcmRequest(null);
              }}
              onBlur={() => formik.setFieldTouched("ncm", true)}
              options={ncms || []}
              optionLabel="name"
              editable
              placeholder="Busque um NCM"
              className="input-drop"
              emptyMessage={
                loadingNcms ? (
                  <p className="message-empty-loading">Carregando...</p>
                ) : errorNcmRequest ? (
                  <p className="message-empty">Nenhum NCM encontrado</p>
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
                dataCsts.map((item: any, i: number) => (
                  <option key={i} value={item.idcst}>
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
                dataCfops.map((item: any, i: any) => (
                  <option key={i} value={item.idcfop}>
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
