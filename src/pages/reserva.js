import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormularioReserva from '../components/FormularioReserva';


function Reserva() {
  const [fechaEntrada, setFechaEntrada] = useState(null);
  const [fechaSalida, setFechaSalida] = useState(null);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);


    // Datos simulados de habitaciones
  const habitaciones = [
    {
      id: 1,
      tipo: 'Habitación Estándar',
      precioTotal: 50000,
      deposito: 25000,
      imagen: 'https://via.placeholder.com/300x200?text=Habitación+Estándar'
    },
    {
      id: 2,
      tipo: 'Habitación Deluxe',
      precioTotal: 80000,
      deposito: 40000,
      imagen: 'https://via.placeholder.com/300x200?text=Habitación+Deluxe'
    },
    {
      id: 3,
      tipo: 'Suite Familiar',
      precioTotal: 120000,
      deposito: 60000,
      imagen: 'https://via.placeholder.com/300x200?text=Suite+Familiar'
    }
  ];

  // Filtrar habitaciones que no estén en mantenimiento
  const habitacionesGuardadas = JSON.parse(localStorage.getItem('habitaciones')) || [];
  const habitacionesDisponibles = habitaciones.filter(h => {
    // Si hay datos en localStorage, aplicamos el filtro
    const habitacionMantenimiento = habitacionesGuardadas.find(item => item.id === h.id);
    return !habitacionMantenimiento || !habitacionMantenimiento.enMantenimiento;
  });

  // Mostrar habitaciones solo si hay fechas seleccionadas
  const mostrarHabitaciones = fechaEntrada && fechaSalida;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reservar habitación</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label>Fecha de entrada:</label>
          <DatePicker
            selected={fechaEntrada}
            onChange={(date) => setFechaEntrada(date)}
            selectsStart
            startDate={fechaEntrada}
            endDate={fechaSalida}
            minDate={new Date()}
            placeholderText="Selecciona fecha de entrada"
          />
        </div>

        <div>
          <label>Fecha de salida:</label>
          <DatePicker
            selected={fechaSalida}
            onChange={(date) => setFechaSalida(date)}
            selectsEnd
            startDate={fechaEntrada}
            endDate={fechaSalida}
            minDate={fechaEntrada}
            placeholderText="Selecciona fecha de salida"
          />
        </div>
      </div>
      {mostrarHabitaciones && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {habitacionesDisponibles.map((hab) => (
            <div key={hab.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '300px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9'
            }}>
              <img src={hab.imagen} alt={hab.tipo} style={{ width: '100%', borderRadius: '8px' }} />
              <h3>{hab.tipo}</h3>
              <p><strong>Total:</strong> ₡{hab.precioTotal}</p>
              <p><strong>Depósito (50%):</strong> ₡{hab.deposito}</p>
              <button  onClick={() =>   setHabitacionSeleccionada({
                 ...hab,
                 fechaEntrada,
                fechaSalida
                 })
                }>Reservar</button>
            </div>
          ))}
        </div>
      )}
      {habitacionSeleccionada && (
  <FormularioReserva
    habitacion={habitacionSeleccionada}
    onClose={() => setHabitacionSeleccionada(null)}
  />
)}

      {/* Aquí luego se mostrarán las habitaciones filtradas */}
    </div>
  );
}

export default Reserva;
