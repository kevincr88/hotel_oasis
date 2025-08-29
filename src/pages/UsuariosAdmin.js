import React, { useState, useEffect } from 'react';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    usuario: '',
    password: '',
    rol: '',
    pregunta_seguridad: '',
    respuesta_seguridad: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  const obtenerUsuarios = () => {
    fetch('http://localhost:3000/usuarios', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const url = editandoId
      ? `http://localhost:3000/usuarios/${editandoId}`
      : 'http://localhost:3000/usuarios/registro';

    const metodo = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message || 'Operación exitosa');
      setForm({
        usuario: '',
        password: '',
        rol: '',
        pregunta_seguridad: '',
        respuesta_seguridad: ''
      });
      setEditandoId(null);
      obtenerUsuarios();
    } else {
      alert(data.error || 'Error en la operación');
    }
  };

  const manejarEditar = (usuario) => {
    setForm({
      usuario: usuario.usuario,
      password: '', // Nueva clave debe escribirse
      rol: usuario.rol,
      pregunta_seguridad: usuario.pregunta_seguridad,
      respuesta_seguridad: ''
    });
    setEditandoId(usuario.id);
  };

  const manejarEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      obtenerUsuarios();
    } else {
      alert(data.error || 'Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Gestión de Usuarios</h2>

      <form onSubmit={manejarSubmit} style={{ marginBottom: '30px' }}>
        <input name="usuario" value={form.usuario} onChange={manejarCambio} placeholder="Usuario" required />
        <input name="password" value={form.password} onChange={manejarCambio} placeholder="Contraseña" type="password" required={!editandoId} />
        <select name="rol" value={form.rol} onChange={manejarCambio} required>
          <option value="">-- Seleccione rol --</option>
          <option value="admin">Administrador</option>
          <option value="recepcionista">Recepcionista</option>
        </select>
        <input name="pregunta_seguridad" value={form.pregunta_seguridad} onChange={manejarCambio} placeholder="Pregunta de seguridad" required />
        <input name="respuesta_seguridad" value={form.respuesta_seguridad} onChange={manejarCambio} placeholder="Respuesta de seguridad" required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Pregunta Seguridad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.usuario}</td>
              <td>{user.rol}</td>
              <td>{user.pregunta_seguridad}</td>
              <td>
                <button onClick={() => manejarEditar(user)}>Editar</button>
                <button onClick={() => manejarEliminar(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosAdmin;
