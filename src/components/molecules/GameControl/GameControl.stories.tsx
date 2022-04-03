import { Switch, Typography } from "@mui/material";

import { GameControl } from "./GameControl";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "GameControl",
  component: GameControl,
  argTypes: {
    setAiEnabled: { action: "set ai enabled" },
  },
};

export const Primary: React.VFC<{ setAiEnabled: (value: boolean) => void }> = ({
  setAiEnabled,
  ...props
}) => (
  <GameControl title="Board size:">
    <Typography>Human 🥸</Typography>
    <Switch defaultChecked onChange={(e, value) => setAiEnabled(value)} />
    <Typography>🤖 AI</Typography>
  </GameControl>
);
