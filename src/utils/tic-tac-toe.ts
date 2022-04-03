// I could have used enums here, but preferred not to: https://fettblog.eu/tidy-typescript-avoid-enums/
export type Player1 = 1;
export const PLAYER1: Player1 = 1;
export type Player2 = -1;
export const PLAYER2: Player2 = -1;
export type Empty = 0;
export const EMPTY: Empty = 0;
export type Draw = 0;
export const DRAW: Draw = 0;

export type Cell = Player1 | Player2 | Empty;

export type TicTacToeBoard = Cell[][];

export type GameResult =
  | ({
      result: Player1 | Player2;
    } & (
      | { where: "ROW" | "COLUMN"; index: number }
      | { where: "DIAGONAL"; index?: never }
      | { where: "ANTIDIAGONAL"; index?: never }
    ))
  | { result: Draw | null; where?: never; index?: never };

export const DEFAULT_SIZE = 3;

export const repeat = (n: number): Cell[] => [...Array(n)];

export const createBoard = (size: number = DEFAULT_SIZE): TicTacToeBoard =>
  repeat(size).map((_) => repeat(size).fill(0));

export const isBoardFull = (board: TicTacToeBoard): boolean => {
  return board.every((row) => row.every((cell) => cell !== 0));
};

export const isValidMove = (
  board: TicTacToeBoard,
  row: number,
  col: number
): boolean =>
  row >= 0 &&
  row < board.length &&
  col >= 0 &&
  col < board.length &&
  board[row][col] === EMPTY;

export const makeMove = (
  board: TicTacToeBoard,
  row: number,
  col: number,
  player: Player1 | Player2
): TicTacToeBoard => {
  if (!isValidMove(board, row, col)) {
    throw new Error("Invalid move");
  }
  const newBoard = board.map((boardRow, index) =>
    index !== row
      ? boardRow
      : boardRow.map((cell, index) => (index === col ? player : cell))
  );
  return newBoard;
};

export const evaluateBoard = (board: TicTacToeBoard): GameResult => {
  const rows = board.map((row) =>
    row.reduce((sum, cell) => sum + cell, 0 as number)
  );

  const cols = board.map((row, i) =>
    repeat(row.length).reduce((sum, _, j) => sum + board[j][i], 0 as number)
  );

  const diagonal = repeat(board.length).reduce(
    (sum, _, i) => sum + board[i][i],
    0 as number
  );

  const antidiagonal = repeat(board.length).reduce(
    (sum, _, i) => sum + board[i][board.length - 1 - i],
    0 as number
  );

  const winningRow = rows.findIndex((row) => Math.abs(row) === board.length);
  if (winningRow !== -1) {
    return {
      result: rows[winningRow] > 0 ? PLAYER1 : PLAYER2,
      where: "ROW",
      index: winningRow,
    };
  }

  const winningCol = cols.findIndex((col) => Math.abs(col) === board.length);
  if (winningCol !== -1) {
    return {
      result: cols[winningCol] > 0 ? PLAYER1 : PLAYER2,
      where: "COLUMN",
      index: winningCol,
    };
  }

  if (Math.abs(diagonal) === board.length) {
    return {
      result: diagonal > 0 ? PLAYER1 : PLAYER2,
      where: "DIAGONAL",
    };
  }

  if (Math.abs(antidiagonal) === board.length) {
    return {
      result: antidiagonal > 0 ? PLAYER1 : PLAYER2,
      where: "ANTIDIAGONAL",
    };
  }

  return isBoardFull(board) ? { result: DRAW } : { result: null };
};

export const getRandomMove = (board: TicTacToeBoard): [number, number] => {
  const emptyCells = board.reduce((acc, row, i) => {
    return row.reduce((acc, cell, j) => {
      if (cell === EMPTY) {
        acc.push([i, j]);
      }
      return acc;
    }, acc);
  }, [] as [number, number][]);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

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

export const boardFromString = (str: string): TicTacToeBoard => {
  const lines = str.split("\n").filter((line) => line.trim());
  const board: TicTacToeBoard = [];
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].trim().split("");
    board.push(row.map((cell) => parseCell(cell)));
  }
  return board;
};

export const getRemainingMoves = (board: TicTacToeBoard): number => {
  return board.reduce((acc, row) => {
    return row.reduce((acc, cell) => {
      if (cell === EMPTY) {
        acc++;
      }
      return acc;
    }, acc);
  }, 0);
};

export const switchPlayer = (player: Player1 | Player2): Player1 | Player2 =>
  player === PLAYER1 ? PLAYER2 : PLAYER1;
