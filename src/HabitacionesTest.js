import React, { useEffect, useState } from 'react';

function HabitacionesTest() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/habitaciones')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener habitaciones');
        }
        return response.json();
      })
      .then(data => {
        setHabitaciones(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener habitaciones:', error);
        setError(error.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando habitaciones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Prueba API: Habitaciones</h1>
      <ul>
        {habitaciones.map(hab => (
          <li key={hab.id_habitacion}>
            {hab.nombre} - ₡{hab.precio} ({hab.estado})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitacionesTest;
