import React, { useEffect, useState } from 'react';

function Reportes() {
  const [fechaInicio, setFechaInicio] = useState('2025-01-01');
  const [fechaFin, setFechaFin] = useState('2025-12-31');
  const [reportes, setReportes] = useState(null);
  const [error, setError] = useState(null);

  // Función para cargar los reportes
  const cargarReportes = () => {
    fetch(`http://localhost:3000/reportes?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`)
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener reportes');
        return response.json();
      })
      .then((data) => {
        setReportes(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setReportes(null);
      });
  };

  useEffect(() => {
    cargarReportes();
  }, []); // Cargar reportes iniciales al montar el componente

  return (
    <div>
      <h2>Reportes del Hotel</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Fecha Inicio:{' '}
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Fecha Fin:{' '}
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
        <button onClick={cargarReportes} style={{ marginLeft: '20px' }}>
          Generar Reporte
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {reportes && (
        <div>
          <h3>Resumen</h3>
          <p>Total de reservas: {reportes.total_reservas}</p>
          <p>Total de huéspedes: {reportes.total_huespedes}</p>
          <p>Total de ingresos: ₡{reportes.total_ingresos}</p>
          <p>Habitación más reservada: {reportes.habitacion_mas_reservada || 'N/A'}</p>
          <p>Habitación con más ocupación: {reportes.habitacion_mas_ocupada || 'N/A'}</p>

          <h3>Detalles de Reservas</h3>
          <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Habitación</th>
                <th>Fecha Entrada</th>
                <th>Fecha Salida</th>
                <th>Personas</th>
                <th>Precio Base</th>
                <th>IVA</th>
                <th>Total Pagado</th>
              </tr>
            </thead>
            <tbody>
              {reportes.reservas.map((reserva) => (
                <tr key={reserva.id_reserva}>
                  <td>{reserva.nombre_cliente}</td>
                  <td>{reserva.habitacion}</td>
                  <td>{reserva.fecha_entrada}</td>
                  <td>{reserva.fecha_salida}</td>
                  <td>{reserva.cantidad_personas}</td>
                  <td>₡{reserva.precio_base}</td>
                  <td>{reserva.iva_aplicado}%</td>
                  <td>₡{reserva.total_pagado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reportes;

