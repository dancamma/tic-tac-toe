import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
interface ScoreProps {
  name1: string;
  name2: string;
  score1: number;
  score2: number;
  turn: string;
}

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 0 auto 16px 0;
  width: 100%;
  padding: 8px 0;
`;

const ScoreLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const TurnLine = styled.div`
  text-align: center;
`;

export const Score: React.VFC<ScoreProps> = ({
  name1,
  name2,
  score1,
  score2,
  turn,
  ...props
}) => {
  return (
    <Container elevation={3} {...props}>
      <ScoreLine>
        <Typography textTransform="uppercase" fontSize={18}>
          🏆 {name1}
        </Typography>
        <Typography fontSize={30} font-weight="bold">
          {score1} - {score2}
        </Typography>
        <Typography textTransform="uppercase" fontSize={18}>
          {name2} 🏆
        </Typography>
      </ScoreLine>
      <TurnLine>
        <Typography fontSize={16} font-weight="bold" textTransform="uppercase">
          {turn}
        </Typography>
      </TurnLine>
    </Container>
  );
};
