import React from 'react';
import './Panel.css';

function Panel({ usuario }) {
  return (
    <div className="panel-container">
      <h2>Panel de control</h2>
      {usuario ? (
        <>
          <p>Has iniciado sesión como: <strong>{usuario}</strong></p>
          <div className="botones-grid">
            <button className="boton-panel" onClick={() => window.location.href = '/checkin'}>Check-in</button>
            <button className="boton-panel" onClick={() => window.location.href = '/checkout'}>Check-out</button>
            <button className="boton-panel" onClick={() => window.location.href = '/reportes'}>Reportes</button>
            <button className="boton-panel" onClick={() => window.location.href = '/mantenimiento'}>Mantenimiento</button>
            <button className="boton-panel" onClick={() => window.location.href = '/registro-directo'}>Registro Directo</button>
            <button className="boton-panel">Ver disponibilidad</button>
          </div>
        </>
      ) : (
        <p>Debes iniciar sesión.</p>
      )}
    </div>
  );
}

export default Panel;

