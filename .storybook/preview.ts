import type { Preview } from '@storybook/react';
import '../src/typography.css';
import '../src/colors.css';
import '../src/shadows.css';
import '../src/scale.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
