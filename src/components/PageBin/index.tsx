import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { ThreeDot } from "react-loading-indicators";
import ItemBin from "../ItemBin";

const PageBin = ({ stage }) => {
  const [itemsBin, setItemsBin] = useState<any>(null);
  const {
    data: dataItemsBin,
    error: errorItemsBin,
    loading: loadingItemsBin,
    requestAPI: requestItemsBin,
  } = useApi("/items/excluido/1", "GET");

  useEffect(() => {
    async function getItemsBin() {
      try {
        const result = await requestItemsBin();
        if (result) {
          setItemsBin(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (stage === "bin") {
      getItemsBin();
    }
  }, [stage]);

  return (
    <div className="page-bin">
      <div className="page-bin__top">
        <h1 className="page-bin__title">Itens da lixeira</h1>
        <div className="group-buttons-top-bin">
          <button className="btn-clean-bin">Esvaziar Lixeira</button>
          <button className="btn-restart-bin">Restaurar Tudo</button>
        </div>
      </div>
      {loadingItemsBin ? (
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
              />
            ))}
        </>
      )}
    </div>
  );
};

export default PageBin;
