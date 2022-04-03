import {
  EMPTY,
  evaluateBoard,
  makeMove,
  PLAYER1,
  Player1,
  PLAYER2,
  Player2,
  switchPlayer,
  TicTacToeBoard,
} from "./tic-tac-toe";

const behaviours = {
  [PLAYER1]: {
    init: -Infinity,
    isBetterMove: (score: number, newScore: number) => newScore > score,
  },
  [PLAYER2]: {
    init: Infinity,
    isBetterMove: (score: number, newScore: number) => newScore < score,
  },
};

export const minimax = (
  board: TicTacToeBoard,
  maximizingPlayer: Player1 | Player2,
  maxDepth = 6
): { score: number; move: [number, number] | null } => {
  const score = evaluateBoard(board);
  if (maxDepth === 0 || score.result !== null) {
    return { score: score.result || 0, move: null };
  }

  let bestScore = behaviours[maximizingPlayer].init;
  let bestMoves: [number, number][] | null = null;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === EMPTY) {
        const moveScore = minimax(
          makeMove(board, i, j, maximizingPlayer),
          switchPlayer(maximizingPlayer),
          maxDepth - 1
        );
        if (
          behaviours[maximizingPlayer].isBetterMove(bestScore, moveScore.score)
        ) {
          bestScore = moveScore.score;
          bestMoves = [[i, j]];
        } else if (bestScore === moveScore.score) {
          bestMoves?.push([i, j]);
        }
      }
    }
  }

  return {
    score: bestScore,
    move: bestMoves?.[Math.floor(Math.random() * bestMoves.length)] || null,
  };
};
