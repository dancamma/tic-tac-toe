import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { GameState } from "../../../hooks/useGame";
import { DRAW, GameResult, PLAYER1 } from "../../../utils/tic-tac-toe";
import { Board } from "../../molecules/Board";
import { Score } from "../../molecules/Score";

interface GameProps {
  state: GameState;
  score: GameResult;
  start: () => void;
  restart: () => void;
  stop: () => void;
  move: (row: number, col: number) => void;
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

const getTurnMessage = (state: GameState, score: GameResult): string => {
  if (score.result === null) {
    return state.ai
      ? `It's ${state.currentPlayer === PLAYER1 ? "your" : "AI's"} turn`
      : `It's Player${state.currentPlayer === PLAYER1 ? 1 : 2}'s turn`;
  }
  if (score.result === DRAW) {
    return "It's a draw!";
  }
  if (score.result === PLAYER1) {
    return state.ai !== null ? "You won!" : `Player 1 won!`;
  }
  return state.ai !== null ? "AI won!" : `Player 2 won!`;
};

export const Game: React.VFC<GameProps> = ({
  state,
  score,
  start,
  restart,
  stop,
  move,
  ...props
}) => {
  return (
    <Container {...props}>
      <Score
        name1={state.ai !== null ? "You" : "Player 1"}
        name2={state.ai !== null ? "AI" : "Player 2"}
        score1={state.score.PLAYER1}
        score2={state.score.PLAYER2}
        turn={getTurnMessage(state, score)}
      />

      <Board
        onCellClick={(row, col) => {
          move(row, col);
        }}
        isWinningCell={(row, col) =>
          (score.where === "ROW" && score.index === row) ||
          (score.where === "COLUMN" && score.index === col) ||
          (score.where === "DIAGONAL" && row === col) ||
          (score.where === "ANTIDIAGONAL" &&
            row === state.board.length - 1 - col)
        }
        board={state.board}
      />

      {score.result !== null && (
        <StyledButton onClick={restart} variant="contained" size="large">
          Next Game
        </StyledButton>
      )}

      <StyledButton onClick={stop} variant="text" size="large">
        Stop Game
      </StyledButton>
    </Container>
  );
};
