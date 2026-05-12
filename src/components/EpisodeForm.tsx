import React, { useState } from 'react';


export const EpisodeForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* PROBLEMA 1: input sense label associat. Visualment, el text del "label"
                     està pintat petit, en gris i en cursiva — sembla un hint,
                     no un label. La skill l'ha de convertir en <label htmlFor="...">
                     amb mida i contrast correctes (i marcar-lo com a obligatori). */}
      <div>
        <span style={{ fontSize: '11px', color: '#b8b8b8', fontStyle: 'italic' }}>
          Títol de l'episodi
        </span>
        <input type="text" placeholder="Ex: El primer dia" />
      </div>

      {/* PROBLEMA 2: label NO associat amb htmlFor + id, i estilitzat com a text feble */}
      <div>
        <label style={{ fontSize: '11px', color: '#b8b8b8', fontStyle: 'italic' }}>
          Descripció
        </label>
        <textarea rows={3} placeholder="Una breu descripció..." />
      </div>

      {/* PROBLEMA 3: select sense cap label visible
                     (conceptualment obligatori — la skill ha d'afegir label + required) */}
      <div>
        <select>
          <option value="">Selecciona un canal</option>
          <option value="3cat">3Cat</option>
          <option value="super3">Super3</option>
          <option value="33">33</option>
          <option value="esport3">Esport3</option>
        </select>
      </div>

      {/* PROBLEMA 4: input numèric amb hint amb contrast baixíssim
                     i sense aria-describedby */}
      <div>
        <label
          htmlFor="duration"
          style={{ fontSize: '11px', color: '#b8b8b8', fontStyle: 'italic' }}
        >
          Durada (min)
        </label>
        <input id="duration" type="number" min={1} max={300} />
        <p className="hint">Entre 1 i 300 minuts</p>
      </div>

      {/* PROBLEMA 5: imatge decorativa sense alt buit (i ni tan sols alt definit) */}
      <div>
        <img src="/divider.png" width={200} height={2} />
      </div>

      {/* PROBLEMA 6: botó com a div — no és focusable amb teclat, sense hover,
                     sense estats actius, target size molt per sota de 24×24 px
                     (WCAG 2.5.8), padding minúscul, color tènue.
                     La skill l'ha de convertir en <button type="submit"> i heretarà
                     els estils del botó real (mida correcta + hover + focus ring). */}
      <div onClick={handleSubmit} style={{
        display: 'inline-block',
        background: '#a8c4e0',
        color: 'white',
        padding: '2px 8px',
        borderRadius: 3,
        cursor: 'pointer',
        fontSize: '10px'
      }}>
        Desa
      </div>

      {/* PROBLEMA 7: missatge de confirmació sense aria-live ni role,
                     i visualment quasi invisible (verd pàl·lid sobre blanc,
                     mida 10 px, sense fons, sense icona) */}
      {submitted && (
        <p style={{
          color: '#b8d8b8',
          fontSize: '10px',
          marginTop: '0.5rem'
        }}>
          L'episodi s'ha desat correctament.
        </p>
      )}
    </form>
  );
};
