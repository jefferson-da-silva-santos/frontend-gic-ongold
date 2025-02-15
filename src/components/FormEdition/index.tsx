import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { formattedValues, validate } from "../../utils/validation/validations";
import useApi from "../../hooks/useApi";
import { confirm, alert } from "notie";

const FormEdition = () => {
  const [id, setId] = useState("");

  const {
    data: dataUpdateItem,
    error: errorUpdateItem,
    loading: loadingUpdateItem,
    requestAPI: requestApiUpdateItem,
  } = useApi(`/items/${id}`, "PUT");

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
      const formattedData = formattedValues(values);
      try {
        const result = await requestApiUpdateItem(formattedData);
        if (result) {
          alert({
            type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
            text: "Item atualizado com sucesso!",
            stay: false, // optional, default = false
            time: 2, // optional, default = 3, minimum = 1,
            position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
          })
          
          setId("");
          resetForm();
        } else {
          alert({
            type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
            text: "Erro ao tantar atualizar item!",
            stay: false, // optional, default = false
            time: 2, // optional, default = 3, minimum = 1,
            position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
          })
        }
      } catch (error) {
        alert({
          type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: "Erro ao tantar atualizar item! (Altere algo antes de editar)",
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        })
      }
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
      alert({
        type: 2, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: "Passe um id válido para a busca!",
        stay: false, // optional, default = false
        time: 2, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      })
      setId("");
      return;
    }

    try {
      const result = await requestApiSearchItem();
      if (result) {
        alert({
          type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: "Item encontrado!",
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        })
        const data = result[0];
        formik.setValues({
          description: data.descricao,
          ean: data.ean,
          ncm: data.ncm,
          icmsIn: data.taxa_icms_entrada,
          icmsOut: data.taxa_icms_saida,
          cst: data.cst,
          cfop: data.cfop,
          comission: data.comissao,
          valorUnit: data.valor_unitario,
          totCust: data.totalCusto,
        });
      }
    } catch (error) {
      alert({
        type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: "Não existe nenhum item com este id!",
        stay: false, // optional, default = false
        time: 2, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      })
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
              value={
                loadingSearchItem ? "Carregando..." : formik.values.description
              }
              disabled={loadingSearchItem}
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
              value={loadingSearchItem ? "Carregando..." : formik.values.ean}
              disabled={loadingSearchItem}
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
              value={loadingSearchItem ? "Carregando..." : formik.values.ncm}
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
              value={loadingSearchItem ? "Carregando..." : formik.values.icmsIn}
              disabled={loadingSearchItem}
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
              value={
                loadingSearchItem ? "Carregando..." : formik.values.icmsOut
              }
              disabled={loadingSearchItem}
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
              value={loadingSearchItem ? "Carregando..." : formik.values.cst}
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
              value={loadingSearchItem ? "Carregando..." : formik.values.cfop}
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
              value={
                loadingSearchItem ? "Carregando..." : formik.values.valorUnit
              }
              disabled={loadingSearchItem}
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
              value={
                loadingSearchItem ? "Carregando..." : formik.values.comission
              }
              disabled={loadingSearchItem}
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
              value={
                loadingSearchItem ? "Carregando..." : formik.values.totCust
              }
              placeholder="Calculado automáticmanete"
              disabled
            />
          </label>
          <input
            type="submit"
            disabled={loadingUpdateItem || loadingSearchItem}
            value={loadingUpdateItem ? "Atualizando..." : "Atualizar Item"}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              confirm({
                text: "Tem cereza que deseja deletar este item?",
                submitText: "Sim", // optional, default = 'Yes'
                cancelText: "Não", // optional, default = 'Cancel'
                position: 'top', // optional, default = 'top', enum: ['top', 'bottom']
                submitCallback: null, // optional
                cancelCallback: null // optional
              }, function() {
                console.log('Yes clicked');
              }, function() {
                console.log('No clicked');
              })
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
