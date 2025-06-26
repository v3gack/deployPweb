import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/App.css';


const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario' // valor por defecto
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/usuario/registro', formData, {
        withCredentials: true
      });

      // Si todo salió bien, el backend debería devolver el usuario o mensaje
      alert('Registro exitoso!');
      navigate('/login');
    } catch (err) {
      setError('Error al registrar el usuario');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Registro de Usuario</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label>Nombre</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Contraseña</label>
        </div>

        <div className="input-group">
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
          <label>Rol</label>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>

  );
};

export default RegistroUsuario;