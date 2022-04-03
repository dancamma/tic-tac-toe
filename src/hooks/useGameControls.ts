import { useState } from "react";

export const useGameControls = () => {
  const [size, setSize] = useState(3);
  const [aiLevel, setAiLevel] = useState(100);
  const [aiEnabled, setAiEnabled] = useState(true);

  return {
    size,
    setSize,
    aiLevel,
    setAiLevel,
    aiEnabled,
    setAiEnabled,
  };
};
