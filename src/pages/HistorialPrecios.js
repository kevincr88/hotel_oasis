import React, { useEffect, useState } from 'react';

function HistorialPrecios() {
  const [historial, setHistorial] = useState({ precios: [], iva: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/admin/historial')
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar el historial');
        return response.json();
      })
      .then(data => setHistorial(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Historial de Precios e IVA</h2>

      <h3>Historial de Precios</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Precio</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {historial.precios.map((p) => (
            <tr key={p.id_historial}>
              <td>{p.habitacion}</td>
              <td>₡{p.precio}</td>
              <td>{new Date(p.fecha_inicio).toLocaleString()}</td>
              <td>{p.fecha_fin ? new Date(p.fecha_fin).toLocaleString() : 'Vigente'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '20px' }}>Historial de IVA</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Porcentaje</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {historial.iva.map((i) => (
            <tr key={i.id_impuesto}>
              <td>{i.porcentaje}%</td>
              <td>{new Date(i.fecha_inicio).toLocaleString()}</td>
              <td>{i.fecha_fin ? new Date(i.fecha_fin).toLocaleString() : 'Vigente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialPrecios;
