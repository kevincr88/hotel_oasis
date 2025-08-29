import React, { useEffect, useState } from 'react';

function AdminPrecios() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoIVA, setNuevoIVA] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar habitaciones desde la API
  useEffect(() => {
    fetch('http://localhost:3000/habitaciones')
      .then(response => response.json())
      .then(data => setHabitaciones(data))
      .catch(error => console.error('Error al cargar habitaciones:', error));
  }, []);

  // Actualizar precio de una habitación
  const actualizarPrecio = () => {
    if (!habitacionSeleccionada || !nuevoPrecio) {
      setMensaje('Debe seleccionar una habitación y un nuevo precio.');
      return;
    }

    fetch('http://localhost:3000/admin/actualizar-precio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_habitacion: habitacionSeleccionada,
        nuevo_precio: parseFloat(nuevoPrecio)
      })
    })
      .then(response => response.json())
      .then(data => setMensaje(data.message))
      .catch(error => setMensaje('Error al actualizar precio.'));
  };

  // Actualizar IVA
  const actualizarIVA = () => {
    if (!nuevoIVA) {
      setMensaje('Debe ingresar un nuevo porcentaje de IVA.');
      return;
    }

    fetch('http://localhost:3000/admin/actualizar-iva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nuevo_iva: parseFloat(nuevoIVA) })
    })
      .then(response => response.json())
      .then(data => setMensaje(data.message))
      .catch(error => setMensaje('Error al actualizar IVA.'));
  };

  return (
    <div>
      <h2>Gestión de Precios e IVA</h2>
      
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      <div>
        <h3>Actualizar Precio de Habitación</h3>
        <select
          value={habitacionSeleccionada}
          onChange={(e) => setHabitacionSeleccionada(e.target.value)}
        >
          <option value="">-- Seleccione una habitación --</option>
          {habitaciones.map((hab) => (
            <option key={hab.id_habitacion} value={hab.id_habitacion}>
              {hab.nombre} - ₡{hab.precio}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Nuevo precio"
          value={nuevoPrecio}
          onChange={(e) => setNuevoPrecio(e.target.value)}
        />
        <button onClick={actualizarPrecio}>Actualizar Precio</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Actualizar IVA</h3>
        <input
          type="number"
          placeholder="Nuevo IVA (%)"
          value={nuevoIVA}
          onChange={(e) => setNuevoIVA(e.target.value)}
        />
        <button onClick={actualizarIVA}>Actualizar IVA</button>
      </div>
    </div>
  );
}

export default AdminPrecios;
