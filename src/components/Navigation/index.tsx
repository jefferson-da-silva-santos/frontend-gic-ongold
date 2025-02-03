import React from "react";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <img src="/public/logo_gic.png" alt="" className="navigation__logo" />
      <ul className="navigation__list">
        <li className="navigation__list__item">
          <a href="" className="navigation__list__item__btn">Cadastrar Item</a>
        </li>
        <li className="navigation__list__item">
        <a href="" className="navigation__list__item__btn">Editar Item</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
