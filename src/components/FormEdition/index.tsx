import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validate } from "../../utils/validation/validations";
import useApi from "../../hooks/useApi";

const FormEdition = ({ changeMessage }) => {
  const [id, setId] = useState("");

  const formik = useFormik({
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
      totCust: "",
    },
    validate: (values) => validate(values, true),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      alert(JSON.stringify(values));
    },
  });

  // Busca de itens

  const {
    data: dataSearchItem,
    error: errorSearchItem,
    loading: loadingSearchItem,
    requestAPI: requestApiSearchItem,
  } = useApi(`items/id/${id}`, "GET");

  const handleSearchItem = async () => {
    if (!id || isNaN(Number(id))) {
      changeMessage("Passe um id válido para a busca!", "rgb(255, 114, 114)");
      setId("");
      return;
    }

    const result = await requestApiSearchItem();
    if (result) {
      const data = result[0];
      formik.values.description = data.descricao;
      formik.values.ean = data.ean;
      formik.values.ncm = data.ncm;
      formik.values.icmsIn = data.taxa_icms_entrada;
      formik.values.icmsOut = data.taxa_icms_saida;
      formik.values.cst = data.cst;
      formik.values.cfop = data.cfop;
      formik.values.comission = data.comissao;
      formik.values.valorUnit = data.valor_unitario;
      formik.values.totCust = data.totalCusto
    }
  };
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2 className="form__title">Edição de Itens</h2>
      <div className="form__group-inputs">
        <div className="form__group-inputs__g0">
          <input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            name=""
            id="id"
            placeholder="* Ex: 89"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSearchItem();
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="form__group-inputs__g1">
          <label>
            <span>Descrição:</span>
            <input
              type="text"
              name="description"
              id="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <span className="text-alert">{formik.errors.description}</span>
            ) : null}
          </label>
          <label>
            <span>Código de Barras (EAN):</span>
            <input
              type="text"
              name="ean"
              id="ean"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ean}
            />
            {formik.touched.ean && formik.errors.ean ? (
              <span className="text-alert">{formik.errors.ean}</span>
            ) : null}
          </label>
          <label>
            <span>NCM:</span>
            <input
              type="text"
              name="ncm"
              id="ncm"
              disabled
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ncm}
            />
            {formik.touched.ncm && formik.errors.ncm ? (
              <span className="text-alert">{formik.errors.ncm}</span>
            ) : null}
          </label>
        </div>

        <div className="form__group-inputs__g2">
          <label>
            <span>Taxa ICMS de entrada (%):</span>
            <input
              type="text"
              name="icmsIn"
              id="icmsIn"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.icmsIn}
            />
            {formik.touched.icmsIn && formik.errors.icmsIn ? (
              <span className="text-alert">{formik.errors.icmsIn}</span>
            ) : null}
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input
              type="text"
              name="icmsOut"
              id="icmsOut"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.icmsOut}
            />
            {formik.touched.icmsOut && formik.errors.icmsOut ? (
              <span className="text-alert">{formik.errors.icmsOut}</span>
            ) : null}
          </label>
          <label>
            <span>CST:</span>
            <input
              type="text"
              name="cst"
              id="cst"
              disabled
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cst}
            />
            {formik.touched.cst && formik.errors.cst ? (
              <span className="text-alert">{formik.errors.cst}</span>
            ) : null}
          </label>
          <label>
            <span>CFOP:</span>
            <input
              type="text"
              name="cfop"
              id="cfop"
              disabled
              value={formik.values.cfop}
            />
            {formik.touched.cfop && formik.errors.cfop ? (
              <span className="text-alert">{formik.errors.cfop}</span>
            ) : null}
          </label>
        </div>
        <div
          className="form__group-inputs__g3"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 10em 10em" }}
        >
          <label>
            <span>Valor unitário</span>
            <input
              type="text"
              name="valorUnit"
              id="valorUnit"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.valorUnit}
            />
            {formik.touched.valorUnit && formik.errors.valorUnit ? (
              <span className="text-alert">{formik.errors.valorUnit}</span>
            ) : null}
          </label>
          <label>
            <span>Comissão para o vendedor (%):</span>
            <input
              type="text"
              name="comission"
              id="comission"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comission}
            />
            {formik.touched.comission && formik.errors.comission ? (
              <span className="text-alert">{formik.errors.comission}</span>
            ) : null}
          </label>
          <label>
            <span>Valor total de custo:</span>
            <input
              type="text"
              name=""
              id=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totCust}
              placeholder="Calculado automáticmanete"
              disabled
            />
          </label>
          <input type="submit" value="Atualizar Item" />
          <button
            onClick={(event) => {
              event.preventDefault();
              console.log("Esse botão não submete o formulário");
            }}
            style={{ backgroundColor: "rgb(255, 109, 109)", color: "white" }}
            className="button-delete"
          >
            Deletar item
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEdition;
