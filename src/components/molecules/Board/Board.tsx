import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { PLAYER1, PLAYER2, TicTacToeBoard } from "../../../utils/tic-tac-toe";
import { Circle } from "../../atoms/Circle";
import { Cross } from "../../atoms/Cross";

interface BoardProps {
  board: TicTacToeBoard;
  onCellClick: (row: number, col: number) => void;
  isWinningCell: (row: number, col: number) => boolean;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;

  margin: auto;
`;

const Grid = styled.div<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ size }) =>
    [...Array(size)].map(() => "1fr").join(" ")};
  grid-template-columns: ${({ size }) =>
    [...Array(size)].map(() => "1fr").join(" ")};

  justify-content: center;
  align-content: center;
`;

// this could be refactor to a different component
const GridCell = styled(Button, {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !["index", "boardSize", "isWinning"].includes(prop),
})<{
  index: number;
  boardSize: number;
  isWinning: boolean;
}>`
  border-radius: 0;
  border-top: ${({ index, boardSize }) =>
    index < boardSize ? "none" : "2px solid #000"};
  border-bottom: ${({ index, boardSize }) =>
    index >= boardSize * (boardSize - 1) ? "none" : "2px solid #000"};
  border-left: ${({ index, boardSize }) =>
    index % boardSize === 0 ? "none" : "2px solid #000"};
  border-right: ${({ index, boardSize }) =>
    index % boardSize === boardSize - 1 ? "none" : "2px solid #000"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ isWinning }) => (isWinning ? "#d7ffc6" : "#fff")};
  &:hover,
  &:focus,
  &:active {
    ${({ isWinning }) => (isWinning ? "#d7ffc6" : "#fff")};
  }
  transition: background-color 0.2s ease;
`;

export const Board: React.VFC<BoardProps> = ({
  board,
  onCellClick,
  isWinningCell,
  ...props
}) => {
  const size = board.length;
  return (
    <Container {...props}>
      <Grid size={size}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <GridCell
              index={i * size + j}
              boardSize={size}
              key={`${i}-${j}`}
              onClick={() => onCellClick(i, j)}
              isWinning={isWinningCell(i, j)}
            >
              {cell === PLAYER1 ? (
                <Cross />
              ) : cell === PLAYER2 ? (
                <Circle />
              ) : null}
            </GridCell>
          ))
        )}
      </Grid>
    </Container>
  );
};
