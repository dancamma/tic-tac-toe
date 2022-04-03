import styled from "@emotion/styled";
import { Slider, Switch, Typography } from "@mui/material";

import { GameControl } from "../../molecules/GameControl";

export interface GameControlsProps {
  size: number;
  aiEnabled: boolean;
  aiLevel: number;
  setSize: (size: number) => void;
  setAiEnabled: (aiEnabled: boolean) => void;
  setAiLevel: (level: number) => void;
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const GameControls: React.VFC<GameControlsProps> = ({
  size,
  aiLevel,
  aiEnabled,
  setSize,
  setAiEnabled,
  setAiLevel,
  ...props
}) => (
  <Container {...props}>
    <GameControl title="Board Size">
      <Typography>3</Typography>
      <Slider
        min={3}
        step={1}
        max={10}
        value={size}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(_, value) => setSize(value as number)}
      />
      <Typography>10</Typography>
    </GameControl>
    <GameControl title="Play Against">
      <Typography>Human 🥸</Typography>
      <Switch
        checked={aiEnabled}
        onChange={(e, value) => setAiEnabled(value)}
      />
      <Typography>🤖 AI</Typography>
    </GameControl>
    <GameControl title="AI Difficulty">
      <Typography style={{ flexShrink: 0 }}>Dummy 👶</Typography>
      <Slider
        min={0}
        step={1}
        max={100}
        value={aiLevel}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(_, value) => setAiLevel(value as number)}
      />
      <Typography style={{ flexShrink: 0 }}>👽 Alien</Typography>
    </GameControl>
  </Container>
);
