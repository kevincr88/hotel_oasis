import React, { useEffect, useState } from 'react';

function RegistroDirecto() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [formulario, setFormulario] = useState({
    id_habitacion: '',
    nombre_cliente: '',
    cedula: '',
    telefono: '',
    correo: '',
    cantidad_personas: 1,
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/habitaciones', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        // Mostrar solo habitaciones disponibles
        const disponibles = data.filter(h => h.estado === 'disponible');
        setHabitaciones(disponibles);
      })
      .catch(err => console.error('Error al obtener habitaciones:', err));
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarRegistro = async () => {
    const hoy = new Date().toISOString().split('T')[0];
    const manana = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // +1 día

    try {
      const res = await fetch('http://localhost:3000/registro-directo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formulario,
          fecha_entrada: hoy,
          fecha_salida: manana,
          deposito: 0,
          comentario: 'Registro directo'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje(`✅ Registro directo exitoso. Reserva ID: ${data.id_reserva}`);
      } else {
        setMensaje(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error al registrar directo:', err);
      setMensaje('❌ Error de conexión al servidor');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Registro Directo de Cliente</h2>
      {mensaje && <p>{mensaje}</p>}

      <select name="id_habitacion" value={formulario.id_habitacion} onChange={handleChange}>
        <option value="">Seleccione una habitación disponible</option>
        {habitaciones.map(h => (
          <option key={h.id_habitacion} value={h.id_habitacion}>
            {h.nombre} - Estado: {h.estado}
          </option>
        ))}
      </select>

      <input name="nombre_cliente" placeholder="Nombre del cliente" onChange={handleChange} />
      <input name="cedula" placeholder="Cédula" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="correo" placeholder="Correo" onChange={handleChange} />
      <input type="number" name="cantidad_personas" placeholder="Cantidad de personas" onChange={handleChange} />

      <button onClick={manejarRegistro}>Registrar y hacer Check-in</button>
    </div>
  );
}

export default RegistroDirecto;
