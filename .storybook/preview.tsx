import { Preview } from "@storybook/react";
import "../src/index.scss";
import "../src/styles/variables.scss";

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default preview;
