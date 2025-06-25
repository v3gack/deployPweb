import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/inicio.css';

const Inicio = () => {
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/obtener');
        const preguntasUsuario = response.data.filter(p => p.autorId === 1);
        setPreguntas(preguntasUsuario);
      } catch (error) {
        console.error('Error al cargar preguntas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  const handleEditarPregunta = (id) => {
    navigate(`/seleccion?editar=${id}`); 
  };

  const handleEliminarPregunta = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/eliminar/${id}`); // Ajusta URL según backend
      setPreguntas(preguntas.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
      alert('No se pudo eliminar la pregunta.');
    }
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
                  style={{
                    position: 'relative',
                    paddingRight: '2.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {/* Botón eliminar (X) */}
                  <button
                    onClick={() => handleEliminarPregunta(pregunta.id)}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      border: 'none',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer',
                      lineHeight: '1',
                      padding: 0,
                      width: '17px',
                      height: '17px',
                      borderRadius: '50%',
                      boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                    }}
                    aria-label="Eliminar pregunta"
                    title="Eliminar pregunta"
                  >
                    ×
                  </button>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <div className="pregunta-titulo">{pregunta.titulo}</div>
                      <div className="pregunta-metadata">
                        <span>Grado: {pregunta.grado.replace('_', ' ')}</span>
                        <span style={{ marginLeft: '1rem' }}>
                          Dificultad: {pregunta.dificultad.toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Contenedor de botones */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',           // espacio pequeño entre botones
                        justifyContent: 'flex-end',
                        minWidth: '120px',    // espacio fijo para que estén siempre alineados a la derecha
                      }}
                    >
                      <button
                        onClick={() => navigate(`/pregunta/${pregunta.id}`)}
                        className="btn-editar"
                        style={{
                          marginTop: 0,
                          padding: '4px 8px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          width: 'auto',
                          minWidth: 'auto',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                        }}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleEditarPregunta(pregunta.id)}
                        className="btn-editar"
                        style={{
                          marginTop: 0,
                          padding: '4px 8px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          width: 'auto',
                          minWidth: 'auto',
                        }}
                      >
                        Editar
                      </button>
                    </div>
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
        style={{ padding: '10px 20px', fontSize: '16px', width: 'auto', marginTop: '2rem' }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Inicio;