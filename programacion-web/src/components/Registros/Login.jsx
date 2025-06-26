import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/App.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/usuarios/perfil', {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.usuario) {
          // Si hay sesión activa, redirige
          navigate('/inicio');
        }
      } catch (err) {
        console.log('No hay sesión activa');
        // No hace falta redirigir, el usuario está en /login
      }
    };

    verificarSesion();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      setError('Email y contraseña son obligatorios');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/usuario/logueo', loginData, {
        withCredentials: true
      });

      const usuario = response.data.usuario;

      if (usuario) {
        const now = new Date().toISOString();
        localStorage.setItem('usuario', JSON.stringify(usuario));
        sessionStorage.setItem('fechaLogin', now);
        navigate('/inicio');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error en el servidor o credenciales incorrectas');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <label>Contraseña</label>
        </div>

        <button type="submit">Ingresar</button>
      </form>

      <p>¿No tienes una cuenta? <span className="link" onClick={() => navigate('/registroUsuario')}>Regístrate aquí</span></p>
    </div>
  );
};

export default Login;