import React from 'react';
import { EpisodeForm } from './components/EpisodeForm';
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
    </div>
  );
}

export default App;
