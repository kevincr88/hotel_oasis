// src/pages/Reportes.js
import React, { useEffect, useState } from 'react';

function Reportes() {
  const [reportes, setReportes] = useState({
    totalReservas: 0,
    totalHuespedes: 0,
    ingresosTotales: 0,
    habitacionTop: 'N/A'
  });

  useEffect(() => {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reservasCompletadas = reservas.filter(r => r.checkoutCompleto);

    const totalReservas = reservasCompletadas.length;
    const totalHuespedes = totalReservas; // Por ahora 1 huésped por reserva
    const ingresosTotales = reservasCompletadas.reduce((acc, r) => {
      const precio = parseFloat(r.precioTotal) || 0;
      return acc + precio;
    }, 0);

    // Contar cuántas veces se reservó cada habitación
    const conteoHabitaciones = {};
    reservasCompletadas.forEach(r => {
      conteoHabitaciones[r.habitacion] = (conteoHabitaciones[r.habitacion] || 0) + 1;
    });

    // Encontrar la habitación más reservada
    let habitacionTop = 'N/A';
    let max = 0;
    for (const hab in conteoHabitaciones) {
      if (conteoHabitaciones[hab] > max) {
        max = conteoHabitaciones[hab];
        habitacionTop = hab;
      }
    }

    setReportes({ totalReservas, totalHuespedes, ingresosTotales, habitacionTop });
  }, []);

  return (
    <div>
      <h2>Reportes</h2>
      <p><strong>Total de reservas completadas:</strong> {reportes.totalReservas}</p>
      <p><strong>Total de huéspedes:</strong> {reportes.totalHuespedes}</p>
      <p><strong>Ingresos totales:</strong> ₡{reportes.ingresosTotales}</p>
      <p><strong>Habitación más reservada:</strong> {reportes.habitacionTop}</p>
    </div>
  );
}

export default Reportes;
