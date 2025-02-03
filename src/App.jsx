import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import React, { useEffect, useState } from "react";
import ModelForm from "./components/ModelForm";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
];

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
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json(); // Adicionei await aqui
      setItems(data);
    }
    fetchData();
  }, []);

  const [description, setDescription] = useState('');
  const [ean, setEan] = useState('');
  const [nsm, setNcm] = useState('');
  const [icmsIn, setIcmsIn] = useState('');
  const [icmsOut, setIcmsOut] = useState('');
  const [cst, setCst] = useState('');
  const [cfop, setCfop] = useState('');
  const [velueUnit, setVelueUnit] = useState('');
  const [comission, setComission] = useState('');

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    
  }

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
      {stage === stages[1].name && <ModelForm edit={false} />}
      {stage === stages[2].name && <ModelForm edit={true} />}
    </div>
  );
}

export default App;
