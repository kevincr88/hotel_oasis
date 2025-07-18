// src/pages/Mantenimiento.js
import React, { useState, useEffect } from 'react';

function Mantenimiento() {
  const habitacionesIniciales = [
    { id: 1, nombre: 'Habitación 101', enMantenimiento: false },
    { id: 2, nombre: 'Habitación 102', enMantenimiento: false },
    { id: 3, nombre: 'Habitación 103', enMantenimiento: false },
    { id: 4, nombre: 'Habitación 104', enMantenimiento: false },
  ];

  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('habitaciones')) || habitacionesIniciales;
    setHabitaciones(guardadas);
  }, []);

  const toggleMantenimiento = (id) => {
    const actualizadas = habitaciones.map((h) =>
      h.id === id ? { ...h, enMantenimiento: !h.enMantenimiento } : h
    );
    setHabitaciones(actualizadas);
    localStorage.setItem('habitaciones', JSON.stringify(actualizadas));
  };

  return (
    <div>
      <h2>Gestión de Mantenimiento</h2>
      <ul>
        {habitaciones.map((h) => (
          <li key={h.id} style={{ margin: '10px 0' }}>
            <strong>{h.nombre}</strong> - Estado:{" "}
            {h.enMantenimiento ? "En mantenimiento" : "Disponible"}{" "}
            <button onClick={() => toggleMantenimiento(h.id)}>
              {h.enMantenimiento ? "Marcar como Disponible" : "Marcar en Mantenimiento"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mantenimiento;
