import { Cross } from "./Cross";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Cross",
  component: Cross,
};

export const Primary = () => <Cross />;
