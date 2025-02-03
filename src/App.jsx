import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import React, { useState } from "react";
import FormRegister from "./components/FormRegister";

const stages = [
  {id: 1, name: "list"},
  {id: 2, name: "register"},
  {id: 3, name: "edit"}
]

function App() {
  const [stage, setStage] = useState(stages[1].name);

  // Função para ir para para lista
  const openList = () => {
    setStage("list");
  }
  const openRegister = () => {
    setStage("insert");
  }
  const openEdit = () => {
    setStage("edit");
  }
  
  return (
    <div className="container">
      <Menu />
      <Navgation />
      {stage === stages[0].name && <CardItems />}
      {stage === stages[1].name && <FormRegister />}
    </div>
  );
}

export default App;
