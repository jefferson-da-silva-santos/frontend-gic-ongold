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

export function baseRequest(url, functionSet) {
  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    functionSet(data);
  }
  fetchData();
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

  // Função para buscar
  const url = "http://localhost:3000/api/gic/items";

  const [items, setItems] = useState([]);
  // const [description, setDescription] = useState('');
  // const [ean, setEan] = useState(0);
  const [ncm, setNcm] = useState([]);
  // const [icmsIn, setIcmsIn] = useState('');
  // const [icmsOut, setIcmsOut] = useState('');
  const [cst, setCst] = useState([]);
  const [cfop, setCfop] = useState([]);
  // const [velueUnit, setVelueUnit] = useState(0);
  // const [comission, setComission] = useState(0);
  // const [totalCusto, setTotalCusto] = useState(0);

  useEffect(() => {
    baseRequest(url, setItems);
  }, []);
  

  // const handleSubmitRegister = async (e) => {
  //   e.preventDefault();
  // }

  return (
    <div className="container">
      <Menu
        openList={openList}
        openRegister={openRegister}
        openEdit={openEdit}
        stage={stage}
      />
      <Navgation />
      {stage === stages[0].name && <CardItems items={items} />}
      {stage === stages[1].name && <ModelForm ncm={ncm} setNcm={setNcm} cst={cst} setCst={setCst} cfop={cfop} setCfop={setCfop}  edit={false} />}
      {stage === stages[2].name && <ModelForm edit={true} />}
    </div>
  );
}

export default App;
