import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      //porsiacaso en el copilot esta la logica de lo nuevo, lo deabjo es del deepsek
      // Aquí iría la llamada a tu API para registrar el usuario
      // Ejemplo:
      // const response = await fetch('/api/registro', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulación de registro exitoso
      console.log('Usuario registrado:', formData);
      alert('Registro exitoso!');
      navigate('/login'); // Redirigir al login después del registro
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