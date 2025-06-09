import React, { useState, useEffect } from 'react'; // ← Faltaba `useEffect`
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css';


const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      navigate('/inicio'); // Ya está logueado
    }
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
      // Aquí iría la llamada a tu API para login
      // Ejemplo:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData)
      // });
      // const data = await response.json();
      
      // Simulación de login exitoso
      //console.log('Usuario logueado:', loginData);******
      // Simulación de usuarios
const usuariosHardcoded = [
  { email: 'admin@admin.com', password: 'admin123', rol: 'administrador' },
  { email: 'usuario@correo.com', password: 'usuario123', rol: 'usuario' }
];

const usuario = usuariosHardcoded.find(
  (u) => u.email === loginData.email && u.password === loginData.password
);

  if (usuario) {
  console.log('Login correcto', usuario);
  localStorage.setItem('usuario', JSON.stringify(usuario)); // ← Guardamos al usuario
  navigate('/inicio'); // <-- asegúrate que está aquí y no anidado innecesariamente
} else {
  setError('Credenciales incorrectas');
}

      
      // Redirigir según el rol (simulado)
     /* const rol = loginData.email.includes('admin') ? 'administrador' : 'usuario';
      if (rol === 'administrador') {
        navigate('/admin/dashboard');
      } else {
        navigate('/usuario/perfil');
      }
        */
      
    } catch (err) {
      setError('Credenciales incorrectas');
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