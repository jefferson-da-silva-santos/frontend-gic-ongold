import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useState } from "react";
import FormRegister from "./components/FormRegister";
import FormEdition from "./components/FormEdition";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
];

function App() {
  // Estado
  const [stage, setStage] = useState(stages[0].name);

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

  return (
    <div className="container">
      <Menu
        openList={openList}
        openRegister={openRegister}
        openEdit={openEdit}
        stage={stage}
      />
      <Navgation />
      {stage === stages[0].name && <CardItems stage={stage} />}
      {stage === stages[1].name && <FormRegister />}
      {stage === stages[2].name && <FormEdition />}
    </div>
  );
}

export default App;
