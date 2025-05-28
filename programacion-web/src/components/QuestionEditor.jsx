import React, { useState } from 'react';
import './EditorPregunta.css';
//import '../../styles/QuestionEditor.css'; 

export default function InteractiveQuestionEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sequenceFiles, setSequenceFiles] = useState([]);
  const [orderMapping, setOrderMapping] = useState({});
  const [grado, setGrado] = useState('primaria');
  const [dificultad, setDificultad] = useState('easy');
  const [respuestaTipo, setRespuestaTipo] = useState('secuencia'); // 'secuencia' o 'unica'
  const [respuestas, setRespuestas] = useState([]); // [{ imagenes: [File] }]

  const handleAddRespuesta = () => {
    setRespuestas([...respuestas, { imagenes: [] }]);
  };

  const handleAddImagen = (idx, file) => {
    setRespuestas(respuestas.map((r, i) =>
      i === idx
        ? {
            ...r,
            imagenes: respuestaTipo === 'unica' ? [file] : [...r.imagenes, file],
          }
        : r
    ));
  };

  const handleRemoveImagen = (idx, imgIdx) => {
    setRespuestas(respuestas.map((r, i) =>
      i === idx
        ? { ...r, imagenes: r.imagenes.filter((_, j) => j !== imgIdx) }
        : r
    ));
  };

  const handleRemoveRespuesta = (idx) => {
    setRespuestas(respuestas.filter((_, i) => i !== idx));
  };

  // Handle sequence image selection
  const handleSequenceChange = (e) => {
    const files = Array.from(e.target.files);
    setSequenceFiles((prev) => [...prev, ...files]);
    // Reset order mapping for new files
    const newMapping = { ...orderMapping };
    files.forEach((_, idx) => {
      const newIndex = sequenceFiles.length + idx;
      newMapping[newIndex] = '';
    });
    setOrderMapping(newMapping);
  };

  // Handle reordering sequence images (drag/drop existing)
  const moveImage = (index, direction) => {
    setSequenceFiles((files) => {
      const newFiles = [...files];
      const [moved] = newFiles.splice(index, 1);
      newFiles.splice(index + direction, 0, moved);
      return newFiles;
    });
  };

  // Handle removing a sequence image and its order input
  const removeImage = (index) => {
    setSequenceFiles((files) => files.filter((_, i) => i !== index));
    setOrderMapping((map) => {
      const newMap = {};
      Object.entries(map).forEach(([key, val]) => {
        const idx = Number(key);
        if (idx < index) newMap[idx] = val;
        else if (idx > index) newMap[idx - 1] = val;
      });
      return newMap;
    });
  };

  const handleOrderChange = (index, value) => {
    setOrderMapping((map) => ({ ...map, [index]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('grado', grado);
    formData.append('dificultad', dificultad);

    // Secuencia de imágenes principal (si aplica)
    sequenceFiles.forEach((file, idx) => {
      formData.append(`sequence_${idx}`, file);
      formData.append(`order_${idx}`, orderMapping[idx] || '');
    });

    // Respuestas posibles
    respuestas.forEach((respuesta, idx) => {
      respuesta.imagenes.forEach((img, imgIdx) => {
        formData.append(`respuesta_${idx}_img_${imgIdx}`, img);
      });
      // Guarda el tipo de respuesta para cada respuesta (opcional, ya que todas son del mismo tipo)
      formData.append(`respuesta_${idx}_tipo`, respuestaTipo);
    });

    console.log('Submitting', {
      title,
      description,
      grado,
      dificultad,
      sequenceFiles,
      orderMapping,
      respuestas,
      respuestaTipo,
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

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Escribe la descripción..."
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="sequence">Imágenes de Secuencia</label>
              <input
                id="sequence"
                type="file"
                accept="image/*"
                multiple
                onChange={handleSequenceChange}
              />
              {sequenceFiles.length > 0 && (
                <ul className="sequence-list">
                  {sequenceFiles.map((file, idx) => (
                    <li key={idx} className="sequence-item">
                      <img src={URL.createObjectURL(file)} alt={`seq-${idx}`} />
                      <span>{file.name}</span>
                      <input
                        type="number"
                        min="1"
                        max={sequenceFiles.length}
                        value={orderMapping[idx] || ''}
                        placeholder="Orden"
                        onChange={(e) => handleOrderChange(idx, e.target.value)}
                        className="order-input"
                      />
                      <div className="sequence-controls">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveImage(idx, -1)}
                        >⬆</button>
                        <button
                          type="button"
                          disabled={idx === sequenceFiles.length - 1}
                          onClick={() => moveImage(idx, 1)}
                        >⬇</button>
                        <button type="button" onClick={() => removeImage(idx)}>✖</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label>Tipo de Respuesta</label>
              <select
                value={respuestaTipo}
                onChange={e => {
                  setRespuestaTipo(e.target.value);
                  setRespuestas([]); // Limpiar respuestas al cambiar tipo
                }}
              >
                <option value="secuencia">Secuencia</option>
                <option value="unica">Imagen única</option>
              </select>
            </div>

            <div className="form-group">
              <label>Respuestas posibles</label>
              <div className="todas-respuestas">
                {respuestas.map((respuesta, idx) => (
                  <div key={idx} className="respuesta-posible">
                    <div className="respuesta-header">
                      <span>Respuesta {idx + 1}</span>
                      <button
                        type="button"
                        className="eliminar-respuesta"
                        title="Eliminar respuesta"
                        onClick={() => handleRemoveRespuesta(idx)}
                      >✖</button>
                    </div>
                    <div className="respuesta-slots">
                      {respuesta.imagenes.map((img, imgIdx) => (
                        <div key={imgIdx} className="respuesta-slot">
                          <img src={URL.createObjectURL(img)} alt={`respuesta-${idx}-${imgIdx}`} />
                          <button
                            type="button"
                            className="eliminar-imagen"
                            title="Eliminar imagen"
                            onClick={() => handleRemoveImagen(idx, imgIdx)}
                          >✖</button>
                        </div>
                      ))}
                      {(respuestaTipo === 'secuencia' || respuesta.imagenes.length === 0) && (
                        <label className="add-imagen">
                          +
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => handleAddImagen(idx, e.target.files[0])}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" className="add-respuesta" onClick={handleAddRespuesta}>+ Añadir respuesta</button>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Guardar Pregunta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}