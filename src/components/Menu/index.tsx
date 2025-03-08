import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";
export const Menu = () => {
  const { isMenuMobileVisible, toggleMenuVisibility } = useMenu();

  return (
    <div
      className={`container-menu ${
        isMenuMobileVisible ? "container-menu-show" : "container-menu-hidden"
      }`}
    >
      <aside className="menu">
        <button onClick={toggleMenuVisibility} className="button-close-menu">
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