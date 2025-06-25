import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/inicio.css';

const Inicio = () => {
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener preguntas del usuario ID 1 (temporal)
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/obtener');
        // Filtrar por autorId = 1 (hasta implementar login)*****************************************
        const preguntasUsuario = response.data.filter(pregunta => pregunta.autorId === 1);
        setPreguntas(preguntasUsuario);
      } catch (error) {
        console.error('Error al cargar preguntas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  // Navegar a la vista de edición de pregunta
  const handleEditarPregunta = (id) => {
    navigate(`/seleccion?editar=${id}`); 
  };

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
          {loading ? (
            <p>Cargando...</p>
          ) : preguntas.length > 0 ? (
            <ul className="inicio-preguntas-list">
              {preguntas.map(pregunta => (
                <li
                  key={pregunta.id}
                  className="pregunta-item"
                  onClick={() => handleEditarPregunta(pregunta.id)}
                >
                  <div className="pregunta-titulo">{pregunta.titulo}</div>
                  <div className="pregunta-metadata">
                    <span>Grado: {pregunta.grado.replace('_', ' ')}</span>
                    <span>Dificultad: {pregunta.dificultad.toLowerCase()}</span>
                  </div>
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
        //className="logout-btn"
        style={{ padding: '10px 20px', fontSize: '16px', width: 'auto', marginTop: '2rem' }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Inicio;