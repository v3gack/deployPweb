import React, { useState } from 'react';
import '../styles/QuestionEditor.css';

export default function InteractiveQuestionEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [respuestaFiles, setRespuestaFiles] = useState([]);
  const [respuestaSymbols, setRespuestaSymbols] = useState([]); // array de "<" o "=" de longitud n-1
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [grado, setGrado] = useState('primaria');
  const [dificultad, setDificultad] = useState('easy');

  // ---- Respuesta (secuencia parcial) ----
  const handleRespuestaChange = (e) => {
    const files = Array.from(e.target.files);
    setRespuestaFiles((prev) => {
      const newFiles = [...prev, ...files];
      setRespuestaSymbols((prevSym) => {
        const extra = files.map(() => '<');
        return [...prevSym, ...extra];
      });
      return newFiles;
    });
  };

  const removeRespuesta = (index) => {
    setRespuestaFiles((files) => files.filter((_, i) => i !== index));
    setRespuestaSymbols((syms) => {
      const newSyms = [...syms];
      newSyms.splice(index, 1);
      return newSyms;
    });
  };

  const toggleSymbol = (idx) => {
    setRespuestaSymbols((syms) => {
      const newSyms = [...syms];
      newSyms[idx] = newSyms[idx] === '<' ? '=' : '<';
      return newSyms;
    });
  };

  // ---- Imágenes adicionales ----
  const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalFiles((prev) => [...prev, ...files]);
  };

  const removeAdditional = (index) => {
    setAdditionalFiles((files) => files.filter((_, i) => i !== index));
  };

  // ---- Envío ----
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('grado', grado);
    formData.append('dificultad', dificultad);

    // Respuesta (parcial)
    respuestaFiles.forEach((file, idx) => {
      formData.append(`respuesta_${idx}`, file);
    });
    respuestaSymbols.forEach((sym, idx) => {
      formData.append(`respuesta_symbol_${idx}`, sym);
    });

    // Imágenes adicionales
    additionalFiles.forEach((file, idx) => {
      formData.append(`additional_${idx}`, file);
    });

    console.log('Submitting', {
      title,
      description,
      grado,
      dificultad,
      respuestaFiles,
      respuestaSymbols,
      additionalFiles,
    });

    // TODO: enviar formData a servidor
  };

  return (
    <div className="editor-container">
      <h1 className="page-title">Editor de Pregunta</h1>
      <div className="editor-content">
        <aside className="file-info">
          <h2>Nuevo Archivo</h2>
          <p>Pregunta 1</p>
        </aside>
        <div className="form-section">
          <form onSubmit={handleSubmit} className="question-form">
            {/* Título */}
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe el título..."
                required
              />
            </div>

            {/* Enunciado */}
            <div className="form-group">
              <label htmlFor="description">Enunciado</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Escribe la descripción..."
              />
            </div>

            {/* Grado */}
            <div className="form-group">
              <label htmlFor="grado">Grado Escolar</label>
              <select
                id="grado"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                required
              >
                <option value="1primaria">1ro de Primaria</option>
                <option value="2primaria">2do de Primaria</option>
                <option value="3primaria">3ro de Primaria</option>
                <option value="4primaria">4to de Primaria</option>
                <option value="5primaria">5to de Primaria</option>
                <option value="6primaria">6to de Primaria</option>
                <option value="1secundaria">1ro de Secundaria</option>
                <option value="2secundaria">2do de Secundaria</option>
                <option value="3secundaria">3ro de Secundaria</option>
                <option value="4secundaria">4to de Secundaria</option>
                <option value="5secundaria">5to de Secundaria</option>
                <option value="6secundaria">6to de Secundaria</option>
              </select>
            </div>

            {/* Dificultad */}
            <div className="form-group">
              <label htmlFor="dificultad">Dificultad</label>
              <select
                id="dificultad"
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value)}
                required
              >
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
              </select>
            </div>

            {/* Respuesta (secuencia parcial) */}
            <div className="form-group">
              <label>Respuesta (secuencia parcial)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleRespuestaChange}
              />
              {respuestaFiles.length > 0 && (
                <ul className="respuesta-list">
                  {respuestaFiles.map((file, idx) => (
                    <React.Fragment key={idx}>
                      <li className="respuesta-item">
                        <div className="img-wrapper">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`resp-${idx}`}
                          />
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeRespuesta(idx)}
                          >
                            ✖
                          </button>
                        </div>
                      </li>
                      {idx < respuestaFiles.length - 1 && (
                        <li
                          className="symbol-item"
                          onClick={() => toggleSymbol(idx)}
                        >
                          {respuestaSymbols[idx]}
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>

            {/* Imágenes adicionales */}
            <div className="form-group">
              <label>Imágenes adicionales</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalChange}
              />
              {additionalFiles.length > 0 && (
                <ul className="additional-list">
                  {additionalFiles.map((file, idx) => (
                    <li key={idx} className="additional-item">
                      <div className="img-wrapper">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`add-${idx}`}
                        />
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeAdditional(idx)}
                        >
                          ✖
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Botón Guardar */}
            <button type="submit" className="submit-button">
              Guardar Pregunta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}