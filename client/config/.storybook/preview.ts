import type { Preview } from "@storybook/react";
import "../../src/app/styles/variables.scss"
import "../../src/app/styles/fonts.scss"
import "../../src/app/styles/index.scss"
import "../../src/app/styles/reset.scss"
import "../../src/app/styles/global.scss"
import "../../src/app/types/global.d.ts"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'primary-light-bg',
      values: [
        { name: 'primary-light-bg', value: '#f4f9fd' },
        { name: 'primary-blue-bg', value: '#3f8cff' },
        { name: 'primary-dark-bg', value: '#111111' },
      ],
    },
  },
};

export default preview;
