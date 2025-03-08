import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const MenuContext = createContext({
  isMenuMobileVisible: false,
  toggleMenuVisibility: () => {}
});

// Provedor do contexto
export const MenuProvider = ({ children }) => {
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuMobileVisible(prev => !prev);
  };

  return (
    <MenuContext.Provider value={{ isMenuMobileVisible, toggleMenuVisibility }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook para usar o contexto
export const useMenu = () => {
  return useContext(MenuContext);
};