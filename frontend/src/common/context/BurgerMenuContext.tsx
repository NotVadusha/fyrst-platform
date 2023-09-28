import React, { createContext, useContext, useState } from 'react';

interface BurgerMenuContextType {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: BurgerMenuContextType = {
  open: false,
  setIsOpen: () => {},
};

const BurgerMenuContext = createContext<BurgerMenuContextType>(defaultContextValue);

export const useBurgerMenuContext = () => {
  return useContext(BurgerMenuContext);
};

export const BurgerMenuProvider: React.FC = ({ children }) => {
  const [open, setIsOpen] = useState(false);

  return (
    <BurgerMenuContext.Provider value={{ open, setIsOpen }}>{children}</BurgerMenuContext.Provider>
  );
};
