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
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/mantenimiento" element={<Mantenimiento />} />
          <Route path="/registro-directo" element={<RegistroDirecto />} />
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;

