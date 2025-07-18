// src/pages/Checkin.js
import React, { useState } from 'react';

function Checkin() {
  const [cedula, setCedula] = useState('');
  const [reserva, setReserva] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [monto, setMonto] = useState('');
  const [comprobante, setComprobante] = useState('');

  const buscarReserva = () => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    const resultado = reservasGuardadas.find(r => r.cedula === cedula);

    if (resultado) {
      setReserva(resultado);
      setMensaje('');
    } else {
      setReserva(null);
      setMensaje('No se encontró una reserva con esa cédula.');
    }
  };

  const finalizarCheckin = () => {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const actualizadas = reservas.map(r => {
      if (r.cedula === cedula) {
        return {
          ...r,
          checkinCompleto: true,
          segundoPago: monto,
          comprobante2: comprobante,
        };
      }
      return r;
    });

    localStorage.setItem('reservas', JSON.stringify(actualizadas));
    setMensaje('Check-in completado exitosamente.');
    setReserva(null);
    setMonto('');
    setComprobante('');
  };

  return (
    <div>
      <h2>Check-in</h2>
      <input
        type="text"
        placeholder="Ingrese cédula del cliente"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <button onClick={buscarReserva}>Buscar</button>

      {mensaje && <p>{mensaje}</p>}

      {reserva && (
        <div style={{ marginTop: '20px' }}>
          <h3>Reserva encontrada:</h3>
          <p><strong>Nombre:</strong> {reserva.nombre}</p>
          <p><strong>Correo:</strong> {reserva.correo}</p>
          <p><strong>Teléfono:</strong> {reserva.telefono}</p>
          <p><strong>Habitación:</strong> {reserva.habitacion}</p>
          <p><strong>Fecha Entrada:</strong> {reserva.fechaEntrada}</p>
          <p><strong>Fecha Salida:</strong> {reserva.fechaSalida}</p>
          <p><strong>Comentario:</strong> {reserva.comentario || 'Ninguno'}</p>

          <input
            type="number"
            placeholder="Monto cancelado en el check-in"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número de comprobante del segundo pago"
            value={comprobante}
            onChange={(e) => setComprobante(e.target.value)}
          />
          <button onClick={finalizarCheckin}>Finalizar Check-in</button>
        </div>
      )}
    </div>
  );
}

export default Checkin;

