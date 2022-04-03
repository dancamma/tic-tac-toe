import { useEffect, useReducer } from "react";

import { minimax } from "../utils/minimax";
import {
  createBoard,
  evaluateBoard,
  getRandomMove,
  getRemainingMoves,
  isValidMove,
  makeMove,
  PLAYER1,
  Player1,
  PLAYER2,
  Player2,
  switchPlayer,
  TicTacToeBoard,
} from "../utils/tic-tac-toe";

export interface GameState {
  score: {
    PLAYER1: number;
    PLAYER2: number;
  };
  inProgress: boolean;
  board: TicTacToeBoard;
  startingPlayer: Player1 | Player2;
  currentPlayer: Player1 | Player2;
  ai: number | null;
}

type Action =
  | { type: "START"; payload: { size: number; ai: number | null } }
  | { type: "NEXT GAME" }
  | { type: "MOVE"; payload: { row: number; col: number } }
  | { type: "STOP" };

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        startingPlayer: PLAYER1,
        currentPlayer: PLAYER1,
        inProgress: true,
        board: createBoard(action.payload.size),
        ai: action.payload.ai,
        score: {
          PLAYER1: 0,
          PLAYER2: 0,
        },
      };
    case "NEXT GAME":
      return {
        ...state,
        inProgress: true,
        startingPlayer: switchPlayer(state.startingPlayer),
        currentPlayer: switchPlayer(state.startingPlayer),
        board: createBoard(state.board.length),
      };

    case "MOVE":
      if (
        evaluateBoard(state.board).result !== null ||
        !isValidMove(state.board, action.payload.row, action.payload.col)
      ) {
        return state;
      }

      const newBoard = makeMove(
        state.board,
        action.payload.row,
        action.payload.col,
        state.currentPlayer
      );

      const score = evaluateBoard(newBoard);
      return {
        ...state,
        board: newBoard,
        currentPlayer: switchPlayer(state.currentPlayer),
        score: {
          PLAYER1:
            score.result === PLAYER1
              ? state.score.PLAYER1 + 1
              : state.score.PLAYER1,
          PLAYER2:
            score.result === PLAYER2
              ? state.score.PLAYER2 + 1
              : state.score.PLAYER2,
        },
      };
    case "STOP":
      return {
        ...state,
        inProgress: false,
      };
    default:
      return state;
  }
};

export const useGame = (size: number, ai: number | null) => {
  const [state, dispatch] = useReducer(reducer, {
    inProgress: false,
    board: createBoard(size),
    startingPlayer: PLAYER1,
    currentPlayer: PLAYER1,
    ai,
    score: {
      PLAYER1: 0,
      PLAYER2: 0,
    },
  });

  const score = evaluateBoard(state.board);
  const start = () => dispatch({ type: "START", payload: { size, ai } });
  const restart = () => dispatch({ type: "NEXT GAME" });
  const stop = () => dispatch({ type: "STOP" });
  const move = (row: number, col: number): void => {
    dispatch({ type: "MOVE", payload: { row, col } });
  };

  useEffect(() => {
    if (
      state.currentPlayer === PLAYER2 &&
      state.ai !== null &&
      score.result === null
    ) {
      let chosenMove: [number, number];
      const remainingMoves = getRemainingMoves(state.board);
      if (Math.pow(Math.random(), 1.5) < state.ai) {
        const minimaxMove = minimax(
          state.board,
          state.currentPlayer,
          remainingMoves > 9 ? 2 : Math.min(remainingMoves, 6)
        );
        chosenMove = minimaxMove.move
          ? minimaxMove.move
          : getRandomMove(state.board);
      } else {
        chosenMove = getRandomMove(state.board);
      }

      move(chosenMove[0], chosenMove[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPlayer, state.startingPlayer]);

  return {
    state,
    score,
    start,
    restart,
    stop,
    move,
  };
};
