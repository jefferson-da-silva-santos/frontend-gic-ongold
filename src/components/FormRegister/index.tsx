import React, { useEffect, useState } from "react";
import { isNaN, useFormik } from "formik";
import useApi from "../../hooks/useApi";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";

interface FormValues {
  description: string;
  ean: string;
  ncm: string;
  icmsIn: string;
  icmsOut: string;
  cst: string;
  cfop: string;
  valorUnit: string;
  comission: string;
}

const FormRegister: React.FC<{ totalCusto: string }> = ({ totalCusto }) => {
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.description) {
      errors.description = "Campo obrigatório";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(values.description)) {
      errors.description =
        "O nome do produto não pode conter caracteres especiais";
    }

    if (!values.ean) {
      errors.ean = "Campo obrigatório";
    } else if (!/^\d{13,}$/.test(values.ean)) {
      errors.ean = "O código de barras deve conter no mínimo 13 dígitos";
    }

    if (!values.ncm) {
      errors.ncm = "Selecione um NCM para continuar";
    }

    if (!values.icmsIn) {
      errors.icmsIn = "Campo obrigatório";
    } else if (isNaN(values.icmsIn)) {
      errors.icmsIn = "A taxa ICMS de entrada deve conter apenas números";
    }

    if (!values.icmsOut) {
      errors.icmsOut = "Campo obrigatório";
    } else if (isNaN(values.icmsOut)) {
      errors.icmsOut = "A taxa ICMS de saída deve conter apenas números";
    }

    if (!values.cst) {
      errors.cst = "Selecione um CST para continuar";
    }

    if (!values.cfop) {
      errors.cfop = "Selecione um CFOP para continuar";
    }

    if (!values.valorUnit) {
      errors.valorUnit = "Campo obrigatório";
    } else if (!/^\d+([.,]\d+)?$/.test(values.valorUnit)) {
      errors.valorUnit = "O valor unitário deve conter apenas números";
    }

    if (!values.comission) {
      errors.comission = "Campo obrigatório";
    } else if (!/^\d+([.,]\d+)?$/.test(values.comission)) {
      errors.comission = "A comissão deve conter apenas números";
    }

    return errors;
  };

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
      alert(JSON.stringify(values));
    },
  });

  // Função que calcula o total de custo
  const calculateTotCust = (
    value = 0,
    entryIcms = 0,
    exitIcms = 0,
    commissionRate = 0
  ) => {
    return parseFloat(
      (
        (entryIcms / 100 + exitIcms / 100 + commissionRate / 100) *
        value
      ).toFixed(2)
    );
  };

  // Função que formata o valor total de custo para o padrão BR
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Requisição para a API
  const {
    data: dataCsts,
    error: errorCsts,
    loading: loadingCsts,
    requestAPI: requestApiCsts,
  } = useApi("/csts", "GET");
  const {
    data: dataNcms,
    error: errorNcms,
    loading: loadingNcms,
    requestAPI: requestApiNcms,
  } = useApi("/ncms", "GET");
  const {
    data: dataCfops,
    error: errorCfops,
    loading: loadingCfops,
    requestAPI: requestApiCfops,
  } = useApi("/cfops", "GET");

  useEffect(() => {
    requestApiCsts();
    requestApiNcms();
    requestApiCfops();
  }, []);

  // Estado para o total de custo
  const [totalCust, setTotalCust] = useState(0);

  // Hook que calcula e atualiza o total de custo.
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

  // Função responsável por limitar as descrições dos itens nos selects
  const limitWord = (texto) => {
    const palavras = texto.split(/\s+/);
    if (palavras.length > 5) {
      return palavras.slice(0, 5).join(" ") + "...";
    }
    return texto;
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <form className="form-register" onSubmit={formik.handleSubmit}>
      <h2 className="form-register__title">Cadastro de Itens</h2>
      <div className="form-register__group-inputs">
        <div className="form-register__group-inputs__g1">
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
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              editable
              placeholder="Busque um NCM"
              className="input-drop"
            />
            {formik.touched.ncm && formik.errors.ncm ? (
              <span className="text-error">{formik.errors.ncm}</span>
            ) : null}
          </label>
        </div>

        <div className="form-register__group-inputs__g2">
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
        <div className="form-register__group-inputs__g3">
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
          <input type="submit" value="Cadastrar Novo Item" />
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
