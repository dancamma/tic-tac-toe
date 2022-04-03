import { GameControls, GameControlsProps } from "./GameControls";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "GameControls",
  argTypes: {
    setSize: { action: "set board size" },
    setAiEnabled: { action: "set ai enabled" },
    setAiLevel: { action: "set ai level" },
  },
  component: GameControls,
};

export const Primary: React.VFC<GameControlsProps> = (props) => (
  <GameControls {...props} />
);
