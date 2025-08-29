import React from 'react';
import { useNavigate } from 'react-router-dom';

function PanelRecep() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px' }}>
      <h2>Panel del Recepcionista</h2>
      <p>Aquí podrás gestionar check-in, check-out, reservas directas y más.</p>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => navigate('/registro-directo')}>Registro Directo</button>
        {/* Aquí puedes agregar más botones luego */}
      </div>
    </div>
  );
}

export default PanelRecep;
