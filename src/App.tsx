import { Button } from './components/Button/Button';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: 600 }}>
      <h1>Surveil Design System</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Browse and test components in{' '}
        <a href="http://localhost:6006" target="_blank" rel="noreferrer">
          Storybook
        </a>{' '}
        (<code>npm run storybook</code>).
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </div>
  );
}
