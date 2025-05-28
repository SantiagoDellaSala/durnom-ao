// src/context/GameContext.jsx
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [personajeConectado, setPersonajeConectado] = useState(null);

  return (
    <GameContext.Provider value={{ personajeConectado, setPersonajeConectado }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
