import React from "react";

const ModelForm = ({edit}) => {
  return (
    <form className="form-register">
      <h2 className="form-register__title">{edit ? "Edição de Itens" : "Cadastro de Itens"}</h2>
      <div className="form-register__group-inputs">
       {edit &&  <div className="form-register__group-inputs__g0">
          <input type="number" name="" id="" placeholder="* Ex: 89"/>
          <button><i className="bi bi-search"></i></button>
        </div>}
        <div className="form-register__group-inputs__g1">
          <label>
            <span>Descrição:</span>
            <input type="text" name="desc" id="desc" required placeholder={!edit ? "* Ex: Smartphone Sansung S20..." : ""}/>
          </label>
          <label>
            <span>Código de Barras (EAN):</span>
            <input type="number" name="ean" id="ean" required placeholder={!edit ? "* Ex: 098463764736" : ""}/>
          </label>
          <label>
            <span>NCM:</span>
            <select name="" id="" disabled={edit}>
              <option value="Teste">teste</option>
              <option value="Teste">teste</option>
              <option value="Teste">teste</option>
              <option value="Teste">teste</option>
              <option value="Teste">teste</option>
            </select>
          </label>
        </div>

        <div className="form-register__group-inputs__g2">
          <label>
            <span>Taxa ICMS de entrada (%):</span>
            <input type="text" name="icms-in" id="icms-in" placeholder={!edit ? "* Ex: 20.5%" : ""}/>
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input type="text" name="icms-out" id="icms-out" placeholder={!edit ? "* Ex: 30%" : ""}/>
          </label>
          <label>
            <span>CST:</span>
            <select name="cst" id="cst" disabled={edit}>
              <option value="cst 1">CST 1</option>
              <option value="cst 1">CST 1</option>
              <option value="cst 1">CST 1</option>
            </select>
          </label>
          <label>
          <span>CFOP:</span>
            <select name="cfop" id="cfop" disabled={edit}>
              <option value="cfop 1">CFOP 1</option>
              <option value="cfop 1">CFOP 2</option>
              <option value="cfop 1">CFOP 3</option>
            </select>
          </label>
        </div>
        <div className="form-register__group-inputs__g3" style={edit ? {gridTemplateColumns: "1fr 1fr 1fr 10em 10em"} : {gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
          <label>
            <span>Valor unitário</span>
            <input type="number" name="value_unit" id="value_unit" placeholder={!edit ? "* Ex: 3000" : ""}/>
          </label>
          <label>
            <span>Comissão para o vendedor:</span>
            <input type="number" name="comissao" id="comissao" placeholder={!edit ? "* Ex: 15%" : ""}/>
          </label>
          <label>
            <span>Valor total de custo:</span>
            <input type="text" name="" id="" placeholder="Calculado automáticmanete" disabled/>
          </label>
          <input type="submit" value={!edit ? "Cadastrar Novo Item" : "Atualizar Item"} />
          {
            edit && <input style={{backgroundColor: 'rgb(255, 109, 109)', color: 'white'}} type="submit" value="Deletar item" />
          }
        </div>
      </div>
    </form>
  ) 
}

export default ModelForm;