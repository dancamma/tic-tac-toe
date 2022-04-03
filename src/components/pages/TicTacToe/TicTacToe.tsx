import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import { useGame } from "../../../hooks/useGame";
import { useGameControls } from "../../../hooks/useGameControls";
import { Controls } from "../../templates/Controls";
import { Game } from "../../templates/Game";

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const TicTacToe: React.VFC = ({ ...props }) => {
  const { aiEnabled, setAiEnabled, aiLevel, setAiLevel, size, setSize } =
    useGameControls();
  const { state, score, start, restart, stop, move } = useGame(
    size,
    aiEnabled ? aiLevel / 100 : null
  );
  return (
    <Container {...props}>
      <Typography mb={4} variant="h3" align="center" textTransform="uppercase">
        Tic Tac Toe
      </Typography>
      {!state.inProgress && (
        <Controls
          onStart={start}
          aiEnabled={aiEnabled}
          setAiEnabled={setAiEnabled}
          aiLevel={aiLevel}
          setAiLevel={setAiLevel}
          size={size}
          setSize={setSize}
        />
      )}
      {state.inProgress && (
        <Game
          state={state}
          score={score}
          start={start}
          restart={restart}
          stop={stop}
          move={move}
        />
      )}
    </Container>
  );
};
