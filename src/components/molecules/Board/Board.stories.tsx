import { boardFromString, createBoard } from "../../../utils/tic-tac-toe";
import { Board } from "./Board";

export default {
  title: "Board",
  component: Board,
  argTypes: {
    onCellClick: { action: "cell clicked" },
  },
};

export const Primary: React.VFC<{ onCellClick: () => void }> = ({
  onCellClick,
}) => (
  <Board
    onCellClick={onCellClick}
    isWinningCell={() => false}
    board={boardFromString(`
  O--
  -X-
  -OX
`)}
  />
);

export const Empty: React.VFC<{ onCellClick: () => void }> = ({
  onCellClick,
}) => (
  <Board
    onCellClick={onCellClick}
    isWinningCell={() => false}
    board={createBoard(3)}
  />
);
