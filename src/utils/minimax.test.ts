import { minimax } from "./minimax";
import { Cell, PLAYER1, PLAYER2, TicTacToeBoard } from "./tic-tac-toe";

const parseCell = (cell: string): Cell => {
  switch (cell) {
    case "X":
      return 1;
    case "O":
      return -1;
    default:
      return 0;
  }
};

const boardFromString = (str: string): TicTacToeBoard => {
  const lines = str.split("\n").filter((line) => line.trim());
  const board: TicTacToeBoard = [];
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].trim().split("");
    board.push(row.map((cell) => parseCell(cell)));
  }
  return board;
};

describe("minimax", () => {
  it("should return 1 if position is winning for player 1", () => {
    const string = `--X
                    OX-
                    ---`;
    const board = boardFromString(string);

    expect(minimax(board, PLAYER2)).toStrictEqual({ move: [0, 0], score: 1 });
  });

  it("should return -1 if position is winning for player 2", () => {
    const string = `O-O
                    XX-
                    -X-`;
    const board = boardFromString(string);

    expect(minimax(board, PLAYER2)).toStrictEqual({ move: [0, 1], score: -1 });
  });

  it("should return 0 if position is equal", () => {
    const string = `--X
                    -X-
                    O-O`;
    const board = boardFromString(string);

    expect(minimax(board, PLAYER1)).toStrictEqual({ move: [2, 1], score: 0 });
  });

  it("should return 0 for starting position", () => {
    const string = `---
                    ---
                    ---`;
    const board = boardFromString(string);

    expect(minimax(board, PLAYER1)).toStrictEqual({ move: [0, 0], score: 0 });
  });
});
