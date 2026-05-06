import React, { useState } from 'react';


export const EpisodeForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* PROBLEMA 1: input sense label associat */}
      <div>
        Títol de l'episodi
        <input type="text" placeholder="Ex: El primer dia" />
      </div>

      {/* PROBLEMA 2: label NO associat amb htmlFor + id */}
      <div>
        <label>Descripció</label>
        <textarea rows={3} placeholder="Una breu descripció..." />
      </div>

      {/* PROBLEMA 3: select sense label */}
      <div>
        <select>
          <option value="">Selecciona un canal</option>
          <option value="3cat">3Cat</option>
          <option value="super3">Super3</option>
          <option value="33">33</option>
          <option value="esport3">Esport3</option>
        </select>
      </div>

      {/* PROBLEMA 4: input numèric amb hint pintat amb contrast baix (a CSS)
                     i a més no està associat amb aria-describedby */}
      <div>
        <label htmlFor="duration">Durada (min)</label>
        <input id="duration" type="number" min={1} max={300} />
        <p className="hint">Entre 1 i 300 minuts</p>
      </div>

      {/* PROBLEMA 5: imatge decorativa sense alt buit (i ni tan sols alt definit) */}
      <div>
        <img src="/divider.png" width={200} height={2} />
      </div>

      {/* PROBLEMA 6: botó com a div (no és focusable amb teclat) */}
      <div onClick={handleSubmit} style={{
        display: 'inline-block',
        background: '#0066cc',
        color: 'white',
        padding: '0.6rem 1.2rem',
        borderRadius: 4,
        cursor: 'pointer'
      }}>
        Desa
      </div>

      {/* PROBLEMA 7: missatge de confirmació sense aria-live */}
      {submitted && (
        <p style={{ color: 'green' }}>L'episodi s'ha desat correctament.</p>
      )}
    </form>
  );
};
