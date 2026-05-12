import { EpisodeForm } from './components/EpisodeForm';
import { A11yOverlay } from './components/A11yOverlay';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>3Cat Shows — Edita Episodi</h1>
      </header>
      <main>
        <EpisodeForm />
      </main>
      {import.meta.env.DEV && <A11yOverlay />}
    </div>
  );
}

export default App;
