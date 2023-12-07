import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: "react-scripts",
      },
    },
    "@storybook/addon-interactions",
  ],

  // features: {
  //   interactionsDebugger: true,
  // },
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      strictMode: true,
    },
  },

  // docs: {
  //   docsPage: true,
  // },
  staticDirs: ["../public"],

  docs: {
    autodocs: false,
  },
};

export default config;
