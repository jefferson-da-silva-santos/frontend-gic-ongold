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
  { id: 4, name: "autoedit"}
];

function App() {
  // Estado
  const [stage, setStage] = useState(stages[0].name);
  const [identify, setIdentify] = useState(null);

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

  const openAutoEdit = (id) => {
    if (stage !== stages[3].name) {
      setIdentify(id);
      setStage(stages[3].name);
    }
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
      {stage === stages[0].name && <CardItems openAutoEdit={openAutoEdit}/>}
      {stage === stages[1].name && <FormRegister />}
      {stage === stages[2].name && <FormEdition identify={null}/>}
      {stage === stages[3].name && <FormEdition identify={identify}/>}
    </div>
  );
}

export default App;
