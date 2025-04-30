import React from 'react';

const ExportOptions = ({ questions }) => {
  return (
    <div className="export-options">
      <h2>Exportar Preguntas</h2>
      <div className="export-buttons">
        <button className="export-btn">
          Exportar a PDF
        </button>
        <button className="export-btn">
          Exportar a Word
        </button>
        <button className="export-btn">
          Compartir enlace
        </button>
        <button className="export-btn">
          Compartir con autor
        </button>
      </div>
      
      <div className="preview-section">
        <h3>Vista previa de exportación</h3>
        <div className="preview-content">
          {questions.length > 0 ? (
            questions.map((q, i) => <p key={i}>{i+1}. {q.text}</p>)
          ) : (
            <p>No hay preguntas para exportar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;