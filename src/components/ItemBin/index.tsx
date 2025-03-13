import React from "react";
import useApi from "../../hooks/useApi";
import notie from "notie";
import { showAlert } from "../../utils/ui/alertUtils";

const ItemBin = ({
  id,
  description,
  ean,
  icms_in,
  icms_out,
  ncm,
  cst,
  cfop,
  v_unit,
  cms,
  vtc,
  setIsItemModify,
  setItemsBin,
}) => {
  const {
    data: dataRestoreItem,
    error: errorRestoreItem,
    loading: loadingRestoreItem,
    requestAPI: requestRestoreItem,
  } = useApi(`/items?id=${id}`, "PATCH");

  const handleRestoreItem = async () => {
    try {
      const result = await requestRestoreItem();
      if (result) {
        showAlert(1, "Item restaurado com sucesso!");
        setIsItemModify(true);
        // Se for o último item na lixeira, forçamos a atualização do estado
        setItemsBin((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          return updatedItems.length > 0 ? updatedItems : [];
        });
      } else {
        showAlert(3, "Erro ao restaurar o item!");
      }
    } catch (error) {
      console.error("Erro ao tentar restaurar item: ", error);
    }
  };

  const {
    data: deletePermanentlyItem,
    error: errorDeletePermanentlyItem,
    loading: loadingDeletePermanentlyItem,
    requestAPI: requestDeletePermanentlyItem,
  } = useApi(`/items?id=${id}`, "DELETE");

  const handleDeletePermanentlyItem = async () => {
    try {
      const result = await requestDeletePermanentlyItem();
      if (result) {
        showAlert(1, "Item excluído permanentemente com sucesso!");
        setIsItemModify(true);

        // Se for o último item na lixeira, forçamos a atualização do estado
        setItemsBin((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          return updatedItems.length > 0 ? updatedItems : [];
        });
      } else {
        showAlert(3, "Erro ao excluir o item permanentemente!");
      }
    } catch (error) {
      console.error("Erro ao tentar deletar item permanentemente: ", error);
    }
  };

  return (
    <div className="page-bin__group-items__item">
      <button
        onClick={() => {
          notie.confirm({
            text: "Deseja realmente restaurar o item?",
            submitText: "Sim",
            cancelText: "Não",
            submitCallback: function () {
              handleRestoreItem();
            },
          });
        }}
        className="btn-res-bin-item"
      >
        <i className="bi bi-arrow-counterclockwise icon-restore-loading"></i>
      </button>
      <button
        onClick={() => {
          notie.confirm({
            text: "Deseja realmente excluir permanentemente o item?",
            submitText: "Sim",
            cancelText: "Não",
            submitCallback: function () {
              handleDeletePermanentlyItem();
            },
          });
        }}
        className="btn-rm-bin-item"
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <div className="page-bin__group-items__item__g1">
        <img src="/public/box-bin.png" alt="" className="img-produto" />
      </div>

      <div className="page-bin__group-items__item__g2">
        <h3 className="item-title">{description}</h3>
        <p className="item-ean">
          Código de barras: <span>{ean}</span>
        </p>
        <p className="discr">Descrição</p>
      </div>

      <div className="page-bin__group-items__item__g3">
        <p className="item-text">
          Taxa ICMS de Entrada: <span>{icms_in}%</span>
        </p>
        <p className="item-text">
          Taxa ICMS de Saída: <span>{icms_out}%</span>
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

      <div className="page-bin__group-items__item__g4">
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

export default ItemBin;
