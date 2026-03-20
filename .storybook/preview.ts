import type { Preview } from '@storybook/react';
import { create } from '@storybook/theming/create';
import '../src/typography.css';
import '../src/colors.css';
import '../src/shadows.css';
import '../src/scale.css';

const surveilTheme = create({
  base: 'light',
  fontBase: '"Roboto", system-ui, sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Surveil Design System',
});

const preview: Preview = {
  parameters: {
    docs: {
      theme: surveilTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Navigation', 'Feedback', 'Input', 'Display'],
      },
    },
  },
};

export default preview;
