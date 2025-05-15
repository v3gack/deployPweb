import React, { useState } from 'react';
import './EditorPregunta.css';

export default function InteractiveQuestionEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sequenceFiles, setSequenceFiles] = useState([]);
  const [completeImage, setCompleteImage] = useState(null);
  const [orderMapping, setOrderMapping] = useState({});

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

  const handleCompleteChange = (e) => {
    const file = e.target.files[0];
    setCompleteImage(file);
  };

  const handleOrderChange = (index, value) => {
    setOrderMapping((map) => ({ ...map, [index]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    sequenceFiles.forEach((file, idx) => {
      formData.append(`sequence_${idx}`, file);
      formData.append(`order_${idx}`, orderMapping[idx] || '');
    });
    if (completeImage) formData.append('complete', completeImage);
    console.log('Submitting', { title, description, sequenceFiles, orderMapping, completeImage });
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
              <label htmlFor="complete">Imagen Completa (Respuesta)</label>
              <input
                id="complete"
                type="file"
                accept="image/*"
                onChange={handleCompleteChange}
              />
              {completeImage && (
                <div className="complete-preview">
                  <img src={URL.createObjectURL(completeImage)} alt="complete" />
                </div>
              )}
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