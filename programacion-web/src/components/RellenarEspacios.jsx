import React, { useState } from 'react';
import './RellenarEspacios.css';

const wordBank = [
  'paradigma', 'objetos', 'Modularidad', 'Reutilizacion',
  'Flexibilidad', 'lenguaje', 'codigo','Refactorizar',
];

const correctAnswers = {
  0: 'paradigma',
  1: 'objetos',
  2: 'Modularidad',
  3: 'Reutilizacion',
  4: 'Flexibilidad',
};

const RellenarEspacios = () => {
  const [answers, setAnswers] = useState({});
  const [dragging, setDragging] = useState(null);

  const handleDrop = (index) => {
    if (dragging !== null) {
      setAnswers({ ...answers, [index]: dragging });
      setDragging(null);
    }
  };

  const handleReset = () => {
    setAnswers({});
  };

  const isCorrect = Object.keys(correctAnswers).every(
    (key) => answers[key] === correctAnswers[key]
  );

  const blanks = [
'La Programación Orientada a Objetos (POO) es un',0,
'que tiene como objetivo recolectar', 1 , 'interrelacionados para resolver problemas.',
'Sus características principales son:',
2,': Permite dividir un sistema en componentes independientes.',
3,': Facilita el uso de código a través de herencia y composición de clases.',
4,': Permite adaptar el software a cambios en requisitos o entorno de ejecución.',
  ];

  return (
    <div className="fill-container">
      <h2 className="fill-title">Completa el texto con las palabras correctas:</h2>

      <div className="fill-text">
        {/* Vera y Luca son dos&nbsp;
        <span className="blank" onClick={() => handleDrop(0)}>
          {answers[0] || '____'}
        </span>
        &nbsp;que viven en un&nbsp;
        <span className="blank" onClick={() => handleDrop(1)}>
          {answers[1] || '____'}
        </span>
        &nbsp;de Jaén.
        <br /><br /> */}
        {blanks.map((item, i) =>
          typeof item === 'number' ? (
            <span
              key={i}
              className="blank"
              onClick={() => handleDrop(item)}
            >
              {answers[item] || '____'}
            </span>
          ) : (
            <span key={i}> {item} </span>
          )
        )}
      </div>

      <div className="word-bank">
        {wordBank.map((word, i) => (
          <div
            key={i}
            className="word"
            draggable
            onDragStart={() => setDragging(word)}
          >
            {word}
          </div>
        ))}
      </div>

      <button onClick={handleReset} className="reset-button">Reiniciar</button>

      {Object.keys(answers).length === Object.keys(correctAnswers).length && isCorrect && (
        <p className="success">¡Muy bien! Completaste el texto correctamente. 🎉</p>
      )}
    </div>
  );
};

export default RellenarEspacios;
