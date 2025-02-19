import React, { useState } from "react";

export const Menu = ({ openList, openRegister, openEdit, openBin, isMenuMobileVisible, setIsMenuMobileVisible }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, callback) => {
    setActiveIndex(index);
    if (callback) callback();
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
          {[
            { label: "Lista de Itens", icon: "bi-card-checklist", action: openList },
            { label: "Cadastrar Item", icon: "bi-plus-circle-fill", action: openRegister },
            { label: "Editar Item", icon: "bi-pen", action: openEdit },
            { label: "Lixeira", icon: "bi-trash-fill", action: openBin },
          ].map((item, index) => (
            <li
              key={index}
              className="menu__list__item"
              style={{ backgroundColor: activeIndex === index ? "rgb(245, 245, 245)" : "transparent" }}
              onClick={() => handleClick(index, item.action)}
            >
              <a href="#" className="menu__list__item__btn">
                <i className={`bi ${item.icon}`}></i> {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Menu;
