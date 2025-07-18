// src/pages/Checkout.js
import React, { useState } from 'react';

function Checkout() {
  const [cedula, setCedula] = useState('');
  const [reserva, setReserva] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const buscarReserva = () => {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    // Solo busca reservas con check-in completado
    const resultado = reservas.find(r => r.cedula === cedula && r.checkinCompleto);

    if (resultado) {
      setReserva(resultado);
      setMensaje('');
    } else {
      setReserva(null);
      setMensaje('No se encontró una reserva activa para esa cédula.');
    }
  };

  const finalizarCheckout = () => {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const actualizadas = reservas.map(r => {
      if (r.cedula === cedula && r.checkinCompleto) {
        return { ...r, checkoutCompleto: true };
      }
      return r;
    });

    localStorage.setItem('reservas', JSON.stringify(actualizadas));
    setMensaje('Check-out completado exitosamente.');
    setReserva(null);
  };

  return (
    <div>
      <h2>Check-out</h2>
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
          <h3>Reserva activa:</h3>
          <p><strong>Nombre:</strong> {reserva.nombre}</p>
          <p><strong>Habitación:</strong> {reserva.habitacion}</p>
          <p><strong>Fecha Entrada:</strong> {reserva.fechaEntrada}</p>
          <p><strong>Fecha Salida:</strong> {reserva.fechaSalida}</p>
          <p><strong>Monto total:</strong> {reserva.precioTotal || '---'}</p>
          <p><strong>Pago total confirmado:</strong> {reserva.segundoPago ? 'Sí' : 'No'}</p>

          <button onClick={finalizarCheckout}>Finalizar Check-out</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;

