import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";

interface GameControlProps {
  title: string;
}

const Container = styled.div`
  margin-bottom: 20px;
`;
export const GameControl: React.FC<GameControlProps> = ({
  title,
  children,
  ...props
}) => (
  <Container {...props}>
    <Typography fontSize={18} fontWeight="bold" textTransform="uppercase">
      {title}
    </Typography>
    <Stack direction="row" spacing={2} alignItems="center">
      {children}
    </Stack>
  </Container>
);
