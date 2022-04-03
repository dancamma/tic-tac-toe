import { Score } from "./Score";

export default {
  title: "Score",
  component: Score,
};

export const Primary: React.VFC<{ onCellClick: () => void }> = () => (
  <Score
    name1="Player 1"
    name2="Player 2"
    turn="It's your turn"
    score1={2}
    score2={3}
  />
);
