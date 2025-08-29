import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/navbar';
import Reserva from './pages/reserva';
import Contacto from './pages/contacto';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';
import Reportes from './pages/Reportes';
import Mantenimiento from './pages/Mantenimiento';
import RegistroDirecto from './pages/RegistroDirecto';
import PanelAdmin from './pages/PanelAdmin';
import PanelRecep from './pages/PanelRecep';
import UsuariosAdmin from './pages/UsuariosAdmin';


function App() {
  const [usuario, setUsuario] = useState(null);
  return (
    <Router>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h1>Bienvenido a Hotel Oasis</h1>} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/panel" element={<Panel usuario={usuario} />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/mantenimiento" element={<Mantenimiento />} />
          <Route path="/registro-directo" element={<RegistroDirecto />} />
          <Route path="/panel/admin" element={<PanelAdmin />} />
          <Route path="/panel/recep" element={<PanelRecep />} />
          <Route path="/usuarios" element={<UsuariosAdmin />} />

        </Routes>
      </main>
    </Router>
  );
}

app.post('/registro-directo', verificarSesion, soloRecep, (req, res) => {
  const {
    id_habitacion,
    nombre_cliente,
    cedula,
    telefono,
    correo,
    cantidad_personas,
    fecha_entrada,
    fecha_salida,
    deposito,
    comentario
  } = req.body;

  const sqlPrecio = `
    SELECT precio FROM historial_precios
    WHERE id_habitacion = ? AND (fecha_fin IS NULL OR fecha_fin > NOW())
    ORDER BY fecha_inicio DESC LIMIT 1
  `;

  db.query(sqlPrecio, [id_habitacion], (err, precioResult) => {
    if (err || precioResult.length === 0) {
      return res.status(500).json({ error: 'No se pudo obtener el precio de la habitación' });
    }

    const precio_base = precioResult[0].precio;
    const sqlIVA = `
      SELECT porcentaje FROM impuestos
      WHERE fecha_fin IS NULL OR fecha_fin > NOW()
      ORDER BY fecha_inicio DESC LIMIT 1
    `;

    db.query(sqlIVA, (err, ivaResult) => {
      const iva_aplicado = ivaResult.length > 0 ? ivaResult[0].porcentaje : 0;
      const total_pagado = precio_base + (precio_base * iva_aplicado / 100);

      const sqlReserva = `
        INSERT INTO reservas (id_habitacion, nombre_cliente, cedula, telefono, correo, cantidad_personas,
          fecha_entrada, fecha_salida, deposito, comentario, precio_base, iva_aplicado, total_pagado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        id_habitacion, nombre_cliente, cedula, telefono, correo, cantidad_personas,
        fecha_entrada, fecha_salida, deposito, comentario, precio_base, iva_aplicado, total_pagado
      ];

      db.query(sqlReserva, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al registrar la reserva' });

        const id_reserva = result.insertId;
        const recepcionista = req.session.usuario;

        const sqlCheckin = `
          INSERT INTO checkins (id_reserva, recepcionista, observaciones)
          VALUES (?, ?, 'Registro directo')
        `;
        db.query(sqlCheckin, [id_reserva, recepcionista], (err) => {
          if (err) return res.status(500).json({ error: 'Reserva creada, pero error en check-in' });

          db.query('UPDATE habitaciones SET estado = "ocupada" WHERE id_habitacion = ?', [id_habitacion]);

          res.status(201).json({ message: 'Registro directo exitoso', id_reserva });
        });
      });
    });
  });
});


export default App;


