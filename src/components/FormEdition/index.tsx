import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  formattedValues,
  isValidId,
  validate,
  showAlert,
  hasPassedValueHours,
} from "../../utils/validation/validation";
import useApi from "../../hooks/useApi";
import notie from "notie";
import { useParams } from "react-router-dom";

const FormEdition = () => {
  const {id} = useParams();
  const [gridColumns, setGridColumns] = useState("1fr"); 

  useEffect(() => {
    const updateGridColumns = () => {
      if (window.innerWidth > 862) {
        setGridColumns("1fr 1fr 1fr 10em 10em");
      } else {
        setGridColumns("1fr"); // Define um layout mais simples para telas menores
      }
    };

    updateGridColumns(); // Chamada inicial
    window.addEventListener("resize", updateGridColumns); // Adiciona evento de resize

    return () => window.removeEventListener("resize", updateGridColumns); // Remove o evento ao desmontar
  }, []);
  
  const [identify, setIdentify] = useState(id || "");
  // Buscar a String de Data de criação do item
  const [stringDataCreatedItem, setStringDataCreatedItem] = useState(null);
  const {
    data,
    error: errorCreatedItem,
    loading: loadingCreatedItem,
    requestAPI: requestApiCreatedItem,
  } = useApi(`/items/filter/id/${id !== null ? id : identify}`, "GET");

  async function fetchData() {
    if (id !== null) {
      try {
        const data = await requestApiCreatedItem();
        setStringDataCreatedItem(data[0].criado_em);
      } catch (error) {
        setStringDataCreatedItem(null);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [identify, id]);

  if (id !== null) {
    useEffect(() => {
      handleSearchItem();
    }, [id]);
  }

  const {
    data: dataUpdateItem,
    error: errorUpdateItem,
    loading: loadingUpdateItem,
    requestAPI: requestApiUpdateItem,
  } = useApi(`/items/${identify}`, "PUT");

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
    totCust: string;
  }

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
      totCust: "",
    },
    validate: (values) => validate(values, true),
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      const formattedData = formattedValues(values);
      try {
        if (stringDataCreatedItem && !hasPassedValueHours(stringDataCreatedItem, 36)) {
          showAlert(
            3,
            "Não é possível editar um item após 36 horas de sua criação!"
          );
          return;
        }
        const result = await requestApiUpdateItem(formattedData);
        if (result) {
          showAlert(1, "Item atualizado com sucesso!");
          setIdentify("");
          resetForm();
        } else {
          showAlert(3, "Erro ao tantar atualizar item!");
        }
      } catch (error) {
        showAlert(
          3,
          "Erro ao tantar atualizar item! (Altere algo antes de editar)"
        );
      }
    },
  });

  // Busca de itens
  const {
    data: dataSearchItem,
    error: errorSearchItem,
    loading: loadingSearchItem,
    requestAPI: requestApiSearchItem,
  } = useApi(`/items/filter/id/${identify}`, "GET");

 const handleSearchItem = async () => {
  if (!identify || isNaN(Number(identify))) {
    return;
  }

  if (identify.trim() === "") {  // Verifica se o campo está vazio
    showAlert(2, "O campo de ID não pode estar vazio!");
    return;
  }

  try {
    const result = await requestApiSearchItem();
    if (result) {
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
    showAlert(
      3,
      "Erro ao tentar buscar item: Não existe nenhum item com este id!"
    );
    formik.resetForm();
  }
};


  const {
    data: dataDeleteItem,
    error: errorDeleteItem,
    loading: loadingDeleteItem,
    requestAPI: requestApiDeleteItem,
  } = useApi(`/items/${identify}`, "DELETE");

  const handleDeleteItem = async (e) => {
    e.preventDefault();

    if (!isValidId(identify) || !isValidId(identify)) {
      showAlert(2, "Passe um id válido para a busca!");
      setIdentify("");
      return;
    }

    const confirmDelete = () => {
      notie.confirm(
        {
          text: "Deseja mover esse item para lixeira?",
          submitText: "Sim",
          cancelText: "Não",
          position: "top",
        },
        async () => {
          try {
            const result = await requestApiDeleteItem();
            if (result) {
              showAlert(1, "Item movido para lixeira!");
              formik.resetForm();
              setIdentify("");
            }
          } catch (error) {
            showAlert(3, "Erro ao tentar deletar item!");
          }
        },
        () => console.log("Ação de cancelamento executada")
      );
    };
    confirmDelete();
  };

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2 className="form__title">Edição de Itens</h2>
      <div className="form__group-inputs">
        <div className="form__group-inputs__g0">
          <input
            type="text"
            value={identify}
            onChange={(e) => {
              setIdentify(e.target.value);
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
          style={{ gridTemplateColumns: gridColumns }}
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
              disabled={
                loadingUpdateItem || loadingSearchItem || loadingDeleteItem
              }
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
            disabled={
              loadingUpdateItem || loadingSearchItem || loadingDeleteItem
            }
            value={loadingUpdateItem ? "Atualizando..." : "Atualizar Item"}
          />
          <button
            onClick={handleDeleteItem}
            style={{ backgroundColor: "rgb(255, 109, 109)", color: "white" }}
            className="button-delete"
            disabled={
              loadingDeleteItem || loadingUpdateItem || loadingSearchItem
            }
          >
            {loadingDeleteItem ? "Deletando..." : "Deletar item"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEdition;
