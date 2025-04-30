import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      <h2>Lista de Preguntas</h2>
      {questions.length === 0 ? (
        <p>No hay preguntas aún. Crea tu primera pregunta.</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={question.id} className="question-item">
              <h3>Pregunta {index + 1}: {question.text}</h3>
              <p>Tipo: {question.type}</p>
              {question.options.length > 0 && (
                <div>
                  <p>Opciones:</p>
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;