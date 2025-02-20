import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { ThreeDot } from "react-loading-indicators";
import ItemBin from "../ItemBin";
import { showAlert } from "../../utils/ui/alertUtils";
import notie from 'notie';

const PageBin = ({ stage, setStage }) => {
  const [isItemModify, setIsItemModify] = useState(false);

  const [itemsBin, setItemsBin] = useState<any>(null);
  const {
    data: dataItemsBin,
    error: errorItemsBin,
    loading: loadingItemsBin,
    requestAPI: requestItemsBin,
  } = useApi("/items/deleted", "GET");

  async function getItemsBin() {
    try {
      const result = await requestItemsBin();
      if (result) {
        setItemsBin(result);
        setIsItemModify(false);
      }
    } catch (error) {
      console.error('Erro ao carregar itens da lixeira: ',error);
    }
  }
  useEffect(() => {
    if (stage === "bin") {
      getItemsBin();
    }
  }, [stage, isItemModify]);
  

  const {data, error, loading: loadingCleanBin, requestAPI: requestCleanBin} = useApi("/items/permanent", "DELETE");

  const handleCleanBin = async () => {
    try {
      const result = await requestCleanBin();
      if (result) {
        showAlert(1, "Lixeira esvaziada com sucesso!");
        setIsItemModify(true);
        setItemsBin([]);
      }
    } catch (error) {
      console.error('Erro ao tentar limpar a lixeira: ', error);
    }
  };

  const {data: dataRestoreAll, error: errorRestoreAll, loading: loadingRestoreAll, requestAPI: requestRestoreAll} = useApi("/items/restore", "PUT");

  const handleRestoreAll = async () => {
    try {
      const result = await requestRestoreAll();
      if (result) {
        showAlert(1, "Itens restaurados com sucesso!");
        setIsItemModify(true);
        setItemsBin([]);
      }
    } catch (error) {
      console.error('Erro ao tentar restaurar todos os itens da lixeira: ',error);
    }
  };
  
  return (
    <div className="page-bin">
      <div className="page-bin__top">
        <h1 className="page-bin__title">{itemsBin && itemsBin.length > 0 ? "Itens da lixeira" : "Lixeira vazia"}</h1>
        {itemsBin && itemsBin.length > 0 && (
          <div className="group-buttons-top-bin">
            <button
             disabled={loadingCleanBin}
              onClick={() => {
                notie.confirm({
                  text: "Deseja realmente esvaziar a lixeira?",
                  submitText: "Sim",
                  cancelText: "Não",
                  submitCallback: function () {
                    handleCleanBin();
                  },
                });
              }}
              className="btn-clean-bin"
            >
              {loadingCleanBin ? 'Esvaziando...' : 'Esvaziar Lixeira'}
            </button>
            <button
            disabled={loadingRestoreAll}
              onClick={() => {
                notie.confirm({
                  text: "Deseja realmente restaurar todos os itens?",
                  submitText: "Sim",
                  cancelText: "Não",
                  submitCallback: function () {
                    handleRestoreAll();
                  },
                });
              }}
              className="btn-restart-bin"
            >
              {loadingRestoreAll ? "Restaurando..." : "Restaurar Tudo"}
            </button>
          </div>
        )}
      </div>
      {loadingItemsBin || loadingCleanBin || loadingRestoreAll ? (
        <ThreeDot
          variant="bounce"
          color="#797979"
          size="medium"
          text=""
          textColor=""
          style={{ marginTop: "3rem" }}
        />
      ) : (
        <>
          {itemsBin &&
            itemsBin.map((item: any) => (
              <ItemBin
                key={item.id}
                id={item.id}
                description={item.descricao}
                ean={item.ean}
                icms_in={item.taxa_icms_entrada}
                icms_out={item.taxa_icms_saida}
                ncm={item.ncm}
                cst={item.cst}
                cfop={item.cfop}
                v_unit={item.valor_unitario}
                cms={item.comissao}
                vtc={item.totalCusto}
                setIsItemModify={setIsItemModify}
                setItemsBin={setItemsBin}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default PageBin;
