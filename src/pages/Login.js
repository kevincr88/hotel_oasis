import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUsuario }) {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔒 importante para mantener la sesión
        body: JSON.stringify({ usuario: usuarioInput, password })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        if (setUsuario) setUsuario(data.usuario);

        // Redirigir según el rol del backend
        if (data.rol === 'admin') {
          navigate('/panel/admin');
        } else if (data.rol === 'recepcionista') {
          navigate('/panel/recep');
        } else {
          alert('Rol no reconocido');
        }
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuarioInput}
          onChange={(e) => setUsuarioInput(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
