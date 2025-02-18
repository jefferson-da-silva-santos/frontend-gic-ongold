import React, { useState } from "react";

export const Menu = ({ openList, openRegister, openEdit, openBin, isMenuMobileVisible, setIsMenuMobileVisible }) => {
  const handleSubmitLinks = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={`container-menu ${
        isMenuMobileVisible ? "container-menu-show" : "container-menu-hidden"
      }`}
    >
      <aside className="menu">
        
        <button onClick={() => setIsMenuMobileVisible(!isMenuMobileVisible)} className="button-close-menu">
          <img src="/public/close-menu.png" alt="" />
        </button>

        <img src="/public/logo_gic.png" alt="" className="menu__logo" />
        <ul className="menu__list">
          <li className="menu__list__item" onClick={openList}>
            <a
              href=""
              className="menu__list__item__btn"
              onClick={handleSubmitLinks}
            >
              <i className="bi bi-card-checklist"></i> Lista de Itens
            </a>
          </li>
          <li className="menu__list__item" onClick={openRegister}>
            <a
              href=""
              className="menu__list__item__btn"
              onClick={handleSubmitLinks}
            >
              <i className="bi bi-plus-circle-fill"></i> Cadastrar Item
            </a>
          </li>
          <li className="menu__list__item" onClick={openEdit}>
            <a
              href=""
              className="menu__list__item__btn"
              onClick={handleSubmitLinks}
            >
              <i className="bi bi-pen"></i> Editar Item
            </a>
          </li>
          <li className="menu__list__item-hr">
            <hr />
          </li>
          <li onClick={openBin} className="menu__list__item">
            <a
              onClick={handleSubmitLinks}
              href=""
              className="menu__list__item__btn"
            >
              <i className="bi bi-trash-fill"></i> Lixeira
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Menu;
