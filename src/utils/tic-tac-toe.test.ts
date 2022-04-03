import {
  boardFromString,
  DRAW,
  evaluateBoard,
  makeMove,
  PLAYER1,
  PLAYER2,
} from "./tic-tac-toe";

describe("evaluateBoard", () => {
  it("should return 1 if player 1 is winning on a diagonal", () => {
    const string = `X--
                    OXO
                    --X`;
    const board = boardFromString(string);

    expect(evaluateBoard(board)).toStrictEqual({
      result: PLAYER1,
      where: "DIAGONAL",
    });
  });

  it("should return -1 if player 2 is winning on a column", () => {
    const string = `O--
                    OXX
                    O-X`;

    const board = boardFromString(string);
    expect(evaluateBoard(board)).toStrictEqual({
      result: PLAYER2,
      where: "COLUMN",
      index: 0,
    });
  });

  it("should return 0 if is a tie", () => {
    const string = `OXX
                    XXO
                    OOX`;

    const board = boardFromString(string);
    expect(evaluateBoard(board)).toStrictEqual({
      result: DRAW,
    });
  });

  it("should return null if game is not over", () => {
    const string = `O--
                    -X-
                    ---`;

    const board = boardFromString(string);
    expect(evaluateBoard(board)).toStrictEqual({
      result: null,
    });
  });

  it("should return 1 if player 1 is winning on a row", () => {
    const string = `XXX
                    O-O
                    ---`;
    const board = boardFromString(string);

    expect(evaluateBoard(board)).toStrictEqual({
      result: PLAYER1,
      where: "ROW",
      index: 0,
    });
  });

  it("should return -1 if player 2 is winning on the other diagonal", () => {
    const string = `-XO
                    XOX
                    O--`;
    const board = boardFromString(string);

    expect(evaluateBoard(board)).toStrictEqual({
      result: PLAYER2,
      where: "ANTIDIAGONAL",
    });
  });

  it("should calculate winner correctly for a board of size 4", () => {
    const string = `O---
                    OXX-
                    O-X-
                    OX--`;
    const board = boardFromString(string);

    expect(evaluateBoard(board)).toStrictEqual({
      result: PLAYER2,
      where: "COLUMN",
      index: 0,
    });
  });
});

describe("makeMove", () => {
  it("should return a new board with the move made for player 1", () => {
    const string = `O--
                    -X-
                    ---`;
    const board = boardFromString(string);
    const newBoard = makeMove(board, 2, 1, PLAYER1);

    expect(newBoard[2][1]).toBe(1);
  });

  it("should return a new board with the move made for player 2", () => {
    const string = `O-X
                    -X-
                    ---`;
    const board = boardFromString(string);
    const newBoard = makeMove(board, 2, 1, PLAYER2);

    expect(newBoard[2][1]).toBe(-1);
  });

  it("should return the same board if the move is invalid", () => {
    const string = `O--
                    -X-
                    -X-`;
    const board = boardFromString(string);

    expect(() => makeMove(board, 2, 1, PLAYER1)).toThrow("Invalid move");
  });

  it("should return the same board if the move indexes are out of range", () => {
    const string = `O--
                    -X-
                    -X-`;
    const board = boardFromString(string);

    expect(() => makeMove(board, 4, 1, PLAYER1)).toThrow("Invalid move");
  });
});
