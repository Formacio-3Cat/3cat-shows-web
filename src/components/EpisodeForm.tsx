import React, { useState } from 'react';


export const EpisodeForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* PROBLEMA 1: input sense label associat (i conceptualment és un camp obligatori
                     — la skill hauria d'afegir asterisc visible + required + aria-required) */}
      <div>
        Títol de l'episodi
        <input type="text" placeholder="Ex: El primer dia" />
      </div>

      {/* PROBLEMA 2: label NO associat amb htmlFor + id */}
      <div>
        <label>Descripció</label>
        <textarea rows={3} placeholder="Una breu descripció..." />
      </div>

      {/* PROBLEMA 3: select sense label (i també conceptualment obligatori) */}
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

      {/* PROBLEMA 6: botó com a div — no focusable amb teclat, sense hover,
                     sense estats actius, padding incorrecte respecte als botons reals */}
      <div onClick={handleSubmit} style={{
        display: 'inline-block',
        background: '#5599dd',
        color: 'white',
        padding: '0.3rem 0.8rem',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}>
        Desa
      </div>

      {/* PROBLEMA 7: missatge de confirmació sense aria-live, sense rol,
                     i estèticament invisible (només text verd) */}
      {submitted && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          L'episodi s'ha desat correctament.
        </p>
      )}
    </form>
  );
};
