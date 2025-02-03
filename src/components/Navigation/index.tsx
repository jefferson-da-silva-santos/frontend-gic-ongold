import React from "react";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <img src="/public/logo_gic.png" alt="" className="navigation__logo" />
      <ul className="navigation__list">
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-card-checklist"></i> Lista de Itens
          </a>
        </li>
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-plus-circle-fill"></i> Cadastrar Item
          </a>
        </li>
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-pen"></i> Editar Item
          </a>
        </li>

        <li className="navigation__list__item-hr">
          <hr />
        </li>

        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-info-circle-fill"></i> Informações
          </a>
        </li>
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-telephone-inbound"></i> Fale Conosco
          </a>
        </li>
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">
            <i className="bi bi-pen"></i> Editar Item
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navigation;
