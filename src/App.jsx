import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useEffect, useState } from "react";
import ModelForm from "./components/ModelForm";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
];

// Função de request
export function baseRequest(url, functionSet) {
  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    functionSet(data);
  }
  fetchData();
}

export function baseRequestFilter(url) {
  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  return fetchData();
}

function baseRequestPOST(url, data) {
  async function fetchData() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return fetchData();
}

// Função de selecionar elementos
function getElement(id) {
  return document.getElementById(id);
}

function App() {
  const [stage, setStage] = useState(stages[0].name);

  // Função para ir para para lista
  const openList = () => {
    setStage(stages[0].name);
  };
  const openRegister = () => {
    setStage(stages[1].name);
  };
  const openEdit = () => {
    setStage(stages[2].name);
  };

  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [colorMessage, setColorMessage] = useState("red");

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
    const regexDesc = /^[a-zA-Z0-9\s\-]+$/;
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

  const [items, setItems] = useState([]);
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

  // Função para buscar
  const url = "http://localhost:3000/api/gic/items";

  useEffect(() => {
    if (stage === stages[0].name) {
      baseRequest(url, setItems);
    }
  }, [stage]);

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
      const result = await baseRequestPOST(
        "http://localhost:3000/api/gic/items",
        data
      );

      if (result) {
        changeMessage("Novo dado inserido com sucesso!", "rgb(40, 146, 26)");
        setCfop(0);
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
        openList();
        setTotalCusto('');
      } else {
        changeMessage("Erro na inserção!", "rgb(255, 95, 95)");
      }
    }
  };

  return (
    <div className="container">
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
        />
      )}
      {stage === stages[2].name && <ModelForm edit={true} description={description}
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
          setTotalCusto={setTotalCusto}/>}
    </div>
  );
}

export default App;
