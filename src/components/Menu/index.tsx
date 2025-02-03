import React from "react";

export const Menu = ({openList, openRegister, openEdit, stage}) => {
  const handleSubmitLinks = (e) => {
    e.preventDefault();
  }
  return (
    <aside className="menu">
      <img src="/public/logo_gic.png" alt="" className="menu__logo" />
      <ul className="menu__list">
        <li className="menu__list__item" onClick={openList}>
          <a href="" className="menu__list__item__btn" onClick={handleSubmitLinks}>
            <i className="bi bi-card-checklist"></i> Lista de Itens
          </a>
        </li>
        <li className="menu__list__item" onClick={openRegister}>
          <a href="" className="menu__list__item__btn" onClick={handleSubmitLinks}>
            <i className="bi bi-plus-circle-fill"></i> Cadastrar Item
          </a>
        </li>
        <li className="menu__list__item" onClick={openEdit}>
          <a href="" className="menu__list__item__btn" onClick={handleSubmitLinks}>
            <i className="bi bi-pen"></i> Editar Item
          </a>
        </li>

        <li className="menu__list__item-hr">
          <hr />
        </li>

        <li className="menu__list__item">
          <a onClick={handleSubmitLinks} href="" className="menu__list__item__btn">
            <i className="bi bi-info-circle-fill"></i> Informações
          </a>
        </li>
        <li className="menu__list__item">
          <a onClick={handleSubmitLinks} href="" className="menu__list__item__btn">
            <i className="bi bi-telephone-inbound"></i> Fale Conosco
          </a>
        </li>
        <li className="menu__list__item">
          <a onClick={handleSubmitLinks} href="" className="menu__list__item__btn">
            <i className="bi bi-pen"></i> Editar Item
          </a>
        </li>
        
      </ul>
    </aside>
  );
};

export default Menu;
