import React, { useState } from 'react';

function FormularioReserva({ habitacion, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    comentario: ''
  });

  const camposLlenos = Object.values(formData).every(valor => valor.trim() !== '');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
   const handleSubmit = () => {
  if (camposLlenos) {
    const nuevaReserva = {
      habitacion: habitacion.tipo,
      precioTotal: habitacion.precioTotal,
      deposito: habitacion.deposito,
      fechaEntrada: habitacion.fechaEntrada, // por si decides incluir fechas
      fechaSalida: habitacion.fechaSalida,
      ...formData,
      fechaReserva: new Date().toLocaleString(),
      id: Date.now() // identificador único
    };

    // Obtener reservas anteriores del localStorage
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];

    // Agregar la nueva reserva
    reservasGuardadas.push(nuevaReserva);

    // Guardar de nuevo en localStorage
    localStorage.setItem("reservas", JSON.stringify(reservasGuardadas));

    alert("Reserva guardada y enviada correctamente ✅");
    onClose();
  }
};

  

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px'
      }}>
        <h3>Completar Reserva - {habitacion.tipo}</h3>

        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
        <input name="cedula" placeholder="Número de cédula" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
        <input name="correo" placeholder="Correo electrónico" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
        <input name="celular" placeholder="Número de celular" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
        <textarea
         name="comentario"
         placeholder="Observaciones (opcional)"
         onChange={handleChange}
         rows="4"
         style={{ width: '100%', margin: '10px 0' }}
        ></textarea>


        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit} disabled={!camposLlenos}>Finalizar reserva</button>
        </div>
      </div>
    </div>
  );
}

export default FormularioReserva;
