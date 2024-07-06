import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Usecase",
          "Architecture",
          "Tech-Stack",
          "DB-Design",
        ],
      },
    },
  },
};

export default preview;
