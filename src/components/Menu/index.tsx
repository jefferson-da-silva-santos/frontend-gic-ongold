import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Menu = ({ isMenuMobileVisible, setIsMenuMobileVisible }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
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
            { label: "Lista de Itens", icon: "bi-card-checklist", path: '/' },
            { label: "Cadastrar Item", icon: "bi-plus-circle-fill", path: '/register'  },
            { label: "Editar Item", icon: "bi-pen", path: '/edition' },
            { label: "Lixeira", icon: "bi-trash-fill", path: '/bin' },
          ].map((item, index) => (
            <li
              key={index}
              className="menu__list__item"
              style={{ backgroundColor: activeIndex === index ? "rgb(245, 245, 245)" : "transparent" }}
              onClick={() => handleClick(index)}
            >
              <Link to={item.path} className="menu__list__item__btn">
                <i className={`bi ${item.icon}`}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Menu;
