import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const preguntasSimuladas = [
    { id: 1, titulo: '¿Cuál es la capital de Francia?' },
    { id: 2, titulo: 'Completa la oración: El sol ___ en el este.' }
  ];

  return (
    <div className="inicio-container">
      <h2>Bienvenido/a al Editor de Preguntas</h2>

      <section>
        <h3>Preguntas hechas</h3>
        <ul>
          {preguntasSimuladas.length > 0 ? (
            preguntasSimuladas.map(pregunta => (
              <li key={pregunta.id}>{pregunta.titulo}</li>
            ))
          ) : (
            <p>No has creado preguntas aún.</p>
          )}
        </ul>
      </section>

      <button onClick={() => navigate('/seleccion')}style={{ padding: '10px 20px', fontSize: '16px', width: 'auto' }}>
        Crear nueva pregunta
      </button>
      <button onClick={() => {
        localStorage.removeItem('usuario');
        navigate('/login');
        }}style={{ padding: '10px 20px', fontSize: '16px', width: 'auto' }}>Cerrar sesión</button>

      


    </div>
  );
};

export default Inicio;
