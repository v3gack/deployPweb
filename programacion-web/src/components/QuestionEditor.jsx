import React, { useState } from 'react';

const QuestionEditor = ({ questions, setQuestions, userRole }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['', '', '']);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: questionText,
      type: questionType,
      options: questionType === 'multiple-choice' ? options.filter(opt => opt.trim() !== '') : [],
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptions(['', '', '']);
  };

  return (
    <div className="question-editor">
      <h2>Crear Nueva Pregunta</h2>
      
      <div className="form-group">
        <label>Tipo de Pregunta:</label>
        <select 
          value={questionType} 
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="multiple-choice">Opción múltiple</option>
          <option value="true-false">Verdadero/Falso</option>
          <option value="short-answer">Respuesta corta</option>
          <option value="Cada Obeja a su Lugar">Cada Obeja a su Lugar</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Pregunta:</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Escribe la pregunta aquí..."
        />
      </div>
      
      {questionType === 'multiple-choice' && (
        <div className="form-group">
          <label>Opciones:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Opción ${index + 1}`}
            />
          ))}
          <button onClick={() => setOptions([...options, ''])}>
            Añadir otra opción
          </button>
        </div>
      )}
      
      <button onClick={addQuestion} className="add-question-btn">
        Añadir Pregunta
      </button>
    </div>
  );
};

export default QuestionEditor;