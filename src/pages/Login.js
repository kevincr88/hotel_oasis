import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUsuario }) {
  const [usuarioInput, setUsuarioInput] = useState('');
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();
    const usuariosValidos = ['admin', 'recep'];
    if (usuariosValidos.includes(usuarioInput.toLowerCase())) {
      setUsuario(usuarioInput.toLowerCase());
      navigate('/panel');
    } else {
      alert('Usuario inválido. Usa "admin" o "recep".');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="text"
          placeholder="Usuario (admin o recep)"
          value={usuarioInput}
          onChange={(e) => setUsuarioInput(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
