import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { GameControls } from "../../organisms/GameControls";

interface ControlsProps {
  aiEnabled: boolean;
  setAiEnabled: (value: boolean) => void;
  aiLevel: number;
  setAiLevel: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
  onStart: () => void;
}

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Controls: React.VFC<ControlsProps> = ({
  onStart,
  aiEnabled,
  setAiEnabled,
  aiLevel,
  setAiLevel,
  size,
  setSize,
  ...props
}) => {
  return (
    <Container {...props}>
      <GameControls
        size={size}
        aiEnabled={aiEnabled}
        aiLevel={aiLevel}
        setSize={setSize}
        setAiEnabled={setAiEnabled}
        setAiLevel={setAiLevel}
      />
      <StyledButton onClick={onStart} variant="contained" size="large">
        Start Game
      </StyledButton>
    </Container>
  );
};
