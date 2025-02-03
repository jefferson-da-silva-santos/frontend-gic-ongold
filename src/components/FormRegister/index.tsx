import React from "react";

const FormRegister = () => {
  return (
    <form className="form-register">
      <h2 className="form-register__title">Cadastro de Itens</h2>
      <div className="form-register__group-inputs">
        <div className="form-register__group-inputs__g0">
          <input type="number" name="" id="" placeholder="* Ex: 89"/>
          <button><i className="bi bi-search"></i></button>
        </div>
        <div className="form-register__group-inputs__g1">
          <label>
            <span>Descrição:</span>
            <input type="text" name="desc" id="desc" required placeholder="* Ex: Smartphone Sansung S20..."/>
          </label>
          <label>
            <span>Código de Barras (EAN):</span>
            <input type="number" name="ean" id="ean" required placeholder="* Ex: 098463764736"/>
          </label>
          <label>
            <span>NCM:</span>
            <select name="" id="">
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
            <input type="text" name="icms-in" id="icms-in" placeholder="* Ex: 20.5%"/>
          </label>
          <label>
            <span>Taxa ICMS de saída (%):</span>
            <input type="text" name="icms-out" id="icms-out" placeholder="* Ex: 30%"/>
          </label>
          <label>
            <span>CST:</span>
            <select name="cst" id="cst">
              <option value="cst 1">CST 1</option>
              <option value="cst 1">CST 1</option>
              <option value="cst 1">CST 1</option>
            </select>
          </label>
          <label>
          <span>CFOP:</span>
            <select name="cfop" id="cfop">
              <option value="cfop 1">CFOP 1</option>
              <option value="cfop 1">CFOP 1</option>
              <option value="cfop 1">CFOP 1</option>
            </select>
          </label>
        </div>
        <div className="form-register__group-inputs__g3">
          <label>
            <span>Valor unitário</span>
            <input type="number" name="value_unit" id="value_unit" placeholder="* Ex: 3000"/>
          </label>
          <label>
            <span>Comissão para o vendedor:</span>
            <input type="number" name="comissao" id="comissao" placeholder="* Ex: 15%"/>
          </label>
          <label>
            <span>Valor total de custo:</span>
            <input type="text" name="" id="" placeholder="Calculado automáticmanete" disabled/>
          </label>
          <input type="submit" value="Cadastrar Novo Item" />
        </div>
      </div>
    </form>
  ) 
}

export default FormRegister;