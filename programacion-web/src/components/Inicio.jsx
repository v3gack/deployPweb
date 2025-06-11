import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/inicio.css';

const preguntasUsuario = [
  { id: 1, nombre: 'Ordenar la serpiente', ruta: '/question' },
  { id: 2, nombre: 'Armar el Sandwich', ruta: '/castor' },
  // ...aquí irán las preguntas reales del usuario
];

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <div className="inicio-title">Bienvenido/a al Editor de Preguntas</div>
      <div className="inicio-main">
        <div className="inicio-left">
          <button
            className="inicio-new-btn"
            onClick={() => navigate('/seleccion')}
          >
            Crear nueva pregunta
          </button>
        </div>
        <div className="inicio-right">
          <h3>Tus preguntas realizadas</h3>
          {preguntasUsuario.length > 0 ? (
            <ul className="inicio-preguntas-list">
              {preguntasUsuario.map(pregunta => (
                <li
                  key={pregunta.id}
                  style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                  onClick={() => navigate(pregunta.ruta)}
                  tabIndex={0}
                >
                  {pregunta.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p>No has creado preguntas aún.</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('usuario');
          navigate('/login');
        }}
        style={{ padding: '10px 20px', fontSize: '16px', width: 'auto', marginTop: '2rem' }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Inicio;