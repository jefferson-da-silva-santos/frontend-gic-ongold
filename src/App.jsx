import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useEffect, useState } from "react";
import FormRegister from "./components/FormRegister";
import apiRequest from "./utils/api/baseRequest";
import FormEdition from "./components/FormEdition";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
];

function App() {
  // Estado
  const [stage, setStage] = useState(stages[0].name);
  const [items, setItems] = useState([]);

  // Função para ir para para lista
  const openList = () => {
    if (stage !== stages[0].name) {
      setStage(stages[0].name);
    }
  };

  // Função para ir para para o cadastro
  const openRegister = () => {
    if (stage !== stages[1].name) {
      setStage(stages[1].name);
    }
  };

  // Função para ir para a edição
  const openEdit = () => {
    if (stage !== stages[2].name) {
      setStage(stages[2].name);
    }
  };

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
      {stage === stages[1].name && <FormRegister />}
      {stage === stages[2].name && <FormEdition />}
    </div>
  );
}

export default App;
