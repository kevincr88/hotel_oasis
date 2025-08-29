import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormularioReserva from '../components/FormularioReserva';

function Reserva() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [fechaEntrada, setFechaEntrada] = useState(null);
  const [fechaSalida, setFechaSalida] = useState(null);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/habitaciones', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setHabitaciones(data))
      .catch(err => {
        console.error('Error al obtener habitaciones:', err);
        alert('Error al obtener habitaciones');
      });
  }, []);

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
          {habitaciones
            .filter(h => h.estado === 'disponible')
            .map((hab) => (
              <div key={hab.id_habitacion} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                width: '300px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9'
              }}>
                {/* Imagen simulada */}
                <img src="https://via.placeholder.com/300x200?text=Habitación" alt={hab.nombre} style={{ width: '100%', borderRadius: '8px' }} />
                <h3>{hab.nombre}</h3>
                <p><strong>Descripción:</strong> {hab.descripcion}</p>
                <button onClick={() =>
                  setHabitacionSeleccionada({
                    ...hab,
                    fechaEntrada,
                    fechaSalida
                  })
                }>
                  Reservar
                </button>
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
    </div>
  );
}

export default Reserva;
