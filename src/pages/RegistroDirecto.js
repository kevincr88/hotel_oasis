// src/pages/RegistroDirecto.js
import React, { useState, useEffect } from 'react';

function RegistroDirecto() {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [pago, setPago] = useState('');
  const [comprobante, setComprobante] = useState('');
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Cargar habitaciones que no están en mantenimiento
  useEffect(() => {
    const habitacionesGuardadas = JSON.parse(localStorage.getItem('habitaciones')) || [
      { id: 1, nombre: 'Habitación Estándar', precio: 50000, enMantenimiento: false },
      { id: 2, nombre: 'Habitación Deluxe', precio: 80000, enMantenimiento: false },
      { id: 3, nombre: 'Suite Familiar', precio: 120000, enMantenimiento: false }
    ];
    const disponibles = habitacionesGuardadas.filter(h => !h.enMantenimiento);
    setHabitacionesDisponibles(disponibles);
  }, []);

  const registrar = () => {
    if (!nombre || !cedula || !telefono || !correo || !habitacion || !pago || !comprobante) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push({
      nombre,
      cedula,
      telefono,
      correo,
      habitacion,
      pago,
      comprobante,
      checkinCompleto: true,
      checkoutCompleto: false
    });

    localStorage.setItem('reservas', JSON.stringify(reservas));
    setMensaje('Registro directo completado con éxito.');
    setNombre('');
    setCedula('');
    setTelefono('');
    setCorreo('');
    setHabitacion('');
    setPago('');
    setComprobante('');
  };

  return (
    <div>
      <h2>Registro Directo</h2>
      {mensaje && <p>{mensaje}</p>}
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      /><br />
      <select
        value={habitacion}
        onChange={(e) => setHabitacion(e.target.value)}
      >
        <option value="">Seleccionar habitación</option>
        {habitacionesDisponibles.map((h) => (
          <option key={h.id} value={h.nombre}>
            {h.nombre} - ₡{h.precio}
          </option>
        ))}
      </select><br />
      <input
        type="number"
        placeholder="Monto pagado (100%)"
        value={pago}
        onChange={(e) => setPago(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Número de comprobante"
        value={comprobante}
        onChange={(e) => setComprobante(e.target.value)}
      /><br />
      <button onClick={registrar}>Registrar</button>
    </div>
  );
}

export default RegistroDirecto;
