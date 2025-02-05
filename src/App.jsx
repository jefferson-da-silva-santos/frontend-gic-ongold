import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useEffect, useRef, useState } from "react";
import ModelForm from "./components/ModelForm";
import Dialog from "./components/Dialog";
import { parseISO, addHours, isAfter } from "date-fns";
import apiRequest from "./utils/api/baseRequest";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
];

// Função de selecionar elementos
function getElement(id) {
  return document.getElementById(id);
}

function App() {
  // Referências de inputs
  const idRef = useRef(null);
  const descRef = useRef(null);
  const eanRef = useRef(null);
  const ncmRef = useRef(null);
  const icms_inRef = useRef(null);
  const icms_outRef = useRef(null);
  const cstRef = useRef(null);
  const cfopRef = useRef(null);
  const comissaoRef = useRef(null);
  // Estado
  const [stage, setStage] = useState(stages[0].name);
  // Mensagem
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [colorMessage, setColorMessage] = useState("red");
  // Itens
  const [items, setItems] = useState([]);
  const [identify, setIdentify] = useState("");
  const [description, setDescription] = useState("");
  const [ean, setEan] = useState("");
  const [ncm, setNcm] = useState(0);
  const [icmsIn, setIcmsIn] = useState("");
  const [icmsOut, setIcmsOut] = useState("");
  const [cst, setCst] = useState(0);
  const [cfop, setCfop] = useState(0);
  const [valueUnit, setValueUnit] = useState("");
  const [comission, setComission] = useState("");
  const [totalCusto, setTotalCusto] = useState("");
  const [criado_em, setCriado_em] = useState("");
  // Dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const [titleDialog, setTitleDialog] = useState("Exemplo");
  const [textDialog, setTextDialog] = useState("Exemplo de texto");
  const [classIconDialog, setClassIconDialog] = useState("");
  const [textBtn1Dialog, setTextBtn1Dialog] = useState("");
  const [textBtn2Dialog, setTextBtn2Dialog] = useState("");
  const [resuDialog, setResuDialog] = useState(0);

  // Função para ir para para lista
  const openList = () => {
    if (stage !== stages[0].name) {
      cleanState();
      setStage(stages[0].name);
    }
  };

  // Função para ir para para o cadastro
  const openRegister = () => {
    if (stage !== stages[1].name) {
      cleanState();
      setStage(stages[1].name);
    }
  };

  // Função para ir para a edição
  const openEdit = () => {
    if (stage !== stages[2].name) {
      cleanState();
      setStage(stages[2].name);
    }
  };

  // Função para exibir mensagens para o usuário
  const changeMessage = (text, color) => {
    setMessage(text);
    setMessageVisible(true);
    setColorMessage(color);
    setTimeout(() => {
      setMessage("");
      setMessageVisible(false);
    }, 3000);
  };

  // Função que valida os dados passadospelo usuário entes de enviar o formulário
  const validateData = (
    desc,
    ean,
    icmsIn,
    icmsOut,
    valueUnit,
    comission,
    cst,
    cfop,
    ncm
  ) => {
    const regexDesc = /^[\p{L}0-9\s-]+$/u;
    const regexEan = /^\d{13}$/;

    if (!regexDesc.test(desc)) {
      changeMessage("Descrição inválida!", "rgb(255, 95, 95)");
      getElement("desc").focus();
      setDescription("");
      return false;
    }

    if (!regexEan.test(ean)) {
      changeMessage("Código de barras inválida!", "rgb(255, 95, 95)");
      getElement("ean").focus();
      setEan("");
      return false;
    }

    if (!ncm) {
      changeMessage("Selecione um NCM", "rgb(133, 119, 0)");
      getElement("ncm").focus();
      return false;
    }

    if (isNaN(icmsIn) || icmsIn < 0) {
      changeMessage("Taxa de ICMS de entrada inválida!", "rgb(255, 95, 95)");
      getElement("icms-in").focus();
      setIcmsIn("");
      return false;
    }

    if (isNaN(icmsOut) || icmsOut < 0) {
      changeMessage("Taxa de ICMS de saída inválida!", "rgb(255, 95, 95)");
      getElement("icms-out").focus();
      setIcmsOut("");
      return false;
    }

    if (!cst) {
      changeMessage("Selecione um CST", "rgb(133, 119, 0)");
      getElement("cst").focus();
      return false;
    }

    if (!cfop) {
      changeMessage("Selecione um CFOP", "rgb(133, 119, 0)");
      getElement("cfop").focus();
      return false;
    }

    if (isNaN(valueUnit) || valueUnit < 0) {
      changeMessage("Valor unitário inválido!", "rgb(255, 95, 95)");
      getElement("value_unit").focus();
      setValueUnit("");
      return false;
    }

    if (isNaN(comission) || comission < 0) {
      changeMessage("Comissão para o vendedor inválida!", "rgb(255, 95, 95)");
      getElement("comissao").focus();
      setComission("");
      return false;
    }

    return {
      valor_unitario: valueUnit,
      descricao: desc,
      taxa_icms_entrada: icmsIn,
      taxa_icms_saida: icmsOut,
      comissao: comission,
      ncm: ncm,
      cst: cst,
      cfop: cfop,
      ean: ean,
      excluido: 0,
    };
  };

  // Função responsável por limitar o tamanho do texto dos options do SELECT
  const limitarPalavras = (texto) => {
    const palavras = texto.split(/\s+/);
    if (palavras.length > 5) {
      return palavras.slice(0, 5).join(" ") + "...";
    }
    return texto;
  };

  // Função para limpar os estados
  function cleanState() {
    setCfop(0);
    setIdentify("");
    setComission("");
    setCfop(0);
    setComission("");
    setDescription("");
    setEan("");
    setIcmsIn("");
    setIcmsOut("");
    setValueUnit("");
    setNcm(0);
    setCst(0);
    setTotalCusto("");
    setCriado_em("");
  }

  // Função que calcula compara um datatime com o datatime atual e valida se já se passaram 36h da sua criação
  function hasPassed36Hours(creationDate) {
    const date = parseISO(creationDate); // Converte a string para um objeto Date
    const datePlus36Hours = addHours(date, 36); // Soma 36 horas à data original
    return isAfter(new Date(), datePlus36Hours); // Compara se a data atual já passou da data + 36h
  }

  // Função para buscar
  useEffect(() => {
    const fetchData = async () => {
      if (stage === stages[0].name) {
        const data = await apiRequest("http://localhost:3000/api/gic/items");
        if (data) setItems(data);
      }
    };
    fetchData();
  }, [stage]);

  // Função para submeter o formulário de Cadastro
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const data = validateData(
      description,
      ean,
      icmsIn,
      icmsOut,
      valueUnit,
      comission,
      cst,
      cfop,
      ncm
    );

    if (data) {
      const result = await apiRequest(
        "http://localhost:3000/api/gic/items",
        "POST",
        data
      );

      if (result) {
        changeMessage("Novo dado inserido com sucesso!", "rgb(40, 146, 26)");
        openList();
      } else {
        changeMessage("Erro na inserção!", "rgb(255, 95, 95)");
      }
    }
  };

  // Função para submeter o formulário de Edição
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!identify) {
      changeMessage("Passe um id e faça uma busca!", "rgb(255, 95, 95)");
      getElement("id").focus();
      return false;
    }

    if (!hasPassed36Hours(criado_em)) {
      changeMessage(
        "Não é permitido Deletar itens antes das 36h de sua criação!",
        "rgb(255, 95, 95)"
      );
      getElement("id").focus();
      return false;
    }

    const data = validateData(
      description,
      ean,
      icmsIn,
      icmsOut,
      valueUnit,
      comission,
      cst,
      cfop,
      ncm
    );

    if (data) {
      const result = await apiRequest(
        `http://localhost:3000/api/gic/items/${identify}`,
        "PUT",
        data
      );

      if (result) {
        changeMessage("Item atualizado com sucesso!", "rgb(40, 146, 26)");
        openList();
      } else {
        changeMessage("Não foi possível editar o tem!", "rgb(255, 95, 95)");
      }
    } else {
      changeMessage("Erro na edição!", "rgb(255, 95, 95)");
    }
  };

  // Função para submeter a exclusão de um item
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    if (!identify) {
      changeMessage("Passe um id e faça uma busca!", "rgb(255, 95, 95)");
      getElement("id").focus();
      return false;
    }

    if (resuDialog === 0) {
      setDialogVisible(true);
      setTitleDialog("Tem certeza que deseja excluir?");
      setTextDialog("O item excluído será encaminhado para lixeira.");
      setClassIconDialog("bi-info-circle-fill");
      setTextBtn1Dialog("Mover para Lixeira");
      setTextBtn2Dialog("Cancelar");
    }
  };

  const hendleDelete = async () => {
    setResuDialog(1);
    const result = await apiRequest(`http://localhost:3000/api/gic/items/${identify}`, 'DELETE');
    if (result) {
      changeMessage("Item adicionado à lixeira", "rgb(40, 146, 26)");
      openList();
    } else {
      changeMessage(
        "Não foi possível adicionar o tem a lixeira!",
        "rgb(255, 95, 95)"
      );
    }
    setResuDialog(0);
    setDialogVisible(false);
  };

  // Função que calcula o total de custo
  const calculateTotCust = () => {
    const value = parseFloat(valueUnit) || 0;
    const entryIcms = parseFloat(icmsIn) || 0;
    const exitIcms = parseFloat(icmsOut) || 0;
    const commissionRate = parseFloat(comission) || 0;

    const totalCost =
      (entryIcms / 100 + exitIcms / 100 + commissionRate / 100) * value;
    setTotalCusto(`R$ ${parseFloat(totalCost.toFixed(2))}`);
  };

  return (
    <div className="container">
      {dialogVisible && (
        <Dialog
          setResuDialog={setResuDialog}
          setDialogVisible={setDialogVisible}
          title={titleDialog}
          text={textDialog}
          classIcon={classIconDialog}
          textBtn1={textBtn1Dialog}
          textBtn2={textBtn2Dialog}
          identify={identify}
          changeMessage={changeMessage}
          openList={openList}
          submit={hendleDelete}
        />
      )}
      <div
        style={{
          ...(!messageVisible
            ? { visibility: "hidden" }
            : { visibility: "visible" }), // Outro estilo inline
          backgroundColor: colorMessage, // Mais um exemplo
        }}
        className="message"
      >
        <p className="message__txt">{message}</p>
      </div>
      <Menu
        openList={openList}
        openRegister={openRegister}
        openEdit={openEdit}
        stage={stage}
      />
      <Navgation />
      {stage === stages[0].name && <CardItems items={items} />}
      {stage === stages[1].name && (
        <ModelForm
          handleSubmitRegister={handleSubmitRegister}
          description={description}
          setDescription={setDescription}
          ean={ean}
          setEan={setEan}
          icmsIn={icmsIn}
          setIcmsIn={setIcmsIn}
          icmsOut={icmsOut}
          setIcmsOut={setIcmsOut}
          valueUnit={valueUnit}
          setValueUnit={setValueUnit}
          comission={comission}
          setComission={setComission}
          ncm={ncm}
          setNcm={setNcm}
          cst={cst}
          setCst={setCst}
          cfop={cfop}
          setCfop={setCfop}
          totalCusto={totalCusto}
          setTotalCusto={setTotalCusto}
          edit={false}
          limitarPalavras={limitarPalavras}
          calculateTotCust={calculateTotCust}
        />
      )}
      {stage === stages[2].name && (
        <ModelForm
          edit={true}
          handleSubmitDelete={handleSubmitDelete}
          handleSubmitEdit={handleSubmitEdit}
          changeMessage={changeMessage}
          identify={identify}
          setIdentify={setIdentify}
          description={description}
          setDescription={setDescription}
          ean={ean}
          setEan={setEan}
          icmsIn={icmsIn}
          setIcmsIn={setIcmsIn}
          icmsOut={icmsOut}
          setIcmsOut={setIcmsOut}
          valueUnit={valueUnit}
          setValueUnit={setValueUnit}
          comission={comission}
          setComission={setComission}
          ncm={ncm}
          setNcm={setNcm}
          cst={cst}
          setCst={setCst}
          cfop={cfop}
          setCfop={setCfop}
          totalCusto={totalCusto}
          setTotalCusto={setTotalCusto}
          cleanState={cleanState}
          setCriado_em={setCriado_em}
        />
      )}
    </div>
  );
}

export default App;
