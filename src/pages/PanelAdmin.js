import React from 'react';
import { useNavigate } from 'react-router-dom';

function PanelAdmin() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px' }}>
      <h2>Panel del Administrador</h2>
      <p>Gestione las operaciones principales del hotel:</p>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => navigate('/admin/usuarios')}>Gestionar Usuarios</button>
        <button onClick={() => navigate('/admin/precios')}>Actualizar Precios de Habitaciones</button>
        <button onClick={() => navigate('/admin/iva')}>Actualizar IVA</button>
        <button onClick={() => navigate('/admin/reportes')}>Ver Reportes</button>
        

      </div>
    </div>
  );
}

export default PanelAdmin;
