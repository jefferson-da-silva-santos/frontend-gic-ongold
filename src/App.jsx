import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import React, { useState } from "react";
import ModelForm from "./components/ModelForm";

const stages = [
  {id: 1, name: "list"},
  {id: 2, name: "register"},
  {id: 3, name: "edit"}
]

function App() {
  const [stage, setStage] = useState(stages[0].name);

  // Função para ir para para lista
  const openList = () => {
    setStage(stages[0].name);
  }
  const openRegister = () => {
    setStage(stages[1].name);
  }
  const openEdit = () => {
    setStage(stages[2].name);
  }
  
  return (
    <div className="container">
      <Menu openList={openList} openRegister={openRegister} openEdit={openEdit} stage={stage}/>
      <Navgation />
      {stage === stages[0].name && <CardItems />}
      {stage === stages[1].name && <ModelForm edit={false} />}
      {stage === stages[2].name && <ModelForm edit={true} />}
      
    </div>
  );
}

export default App;
