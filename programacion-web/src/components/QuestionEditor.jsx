import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/QuestionEditor.css';

export default function InteractiveQuestionEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [preguntaId, setPreguntaId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [respuestaFiles, setRespuestaFiles] = useState([]);
  const [respuestaSymbols, setRespuestaSymbols] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [grado, setGrado] = useState('PRIMARIA_1');
  const [dificultad, setDificultad] = useState('FACIL');

  // Para drag and drop
  const dragItem = useRef();
  const dragOverItem = useRef();

  // 1. Detectar modo edición al cargar
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('editar');
    
    if (id) {
      setIsEditing(true);
      setPreguntaId(id);
      cargarPreguntaExistente(id);
    }
  }, [location]);

  // 2. Cargar datos de pregunta existente
  const cargarPreguntaExistente = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pregunta/obtener/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Asegura que se envíen las cookies de sesión
      });
      const {
        titulo,
        enunciado,
        grado,
        dificultad,
        respuestaImagenes,
        respuestaSimbolos,
        imagenesAdicionales
      } = response.data;

      setTitle(titulo);
      setDescription(enunciado);
      setGrado(grado);
      setDificultad(dificultad);

      // Cargar las imágenes como objetos falsos con .name y .url
      setRespuestaFiles(
        respuestaImagenes.map((url) => ({ url, name: url.split('/').pop() }))
      );

      setRespuestaSymbols(
        respuestaSimbolos?.slice(1).map((num, i) =>
          parseInt(num) > parseInt(respuestaSimbolos[i]) ? '<' : '='
        )
      );

      setAdditionalFiles(
        imagenesAdicionales.map((url) => ({ url, name: url.split('/').pop() }))
      );

    } catch (error) {
      console.error('Error al cargar pregunta:', error);
      alert('No se pudo cargar la pregunta para editar');
    }
  };


  // Ajusta symbols cuando cambien archivos
  useEffect(() => {
    const n = respuestaFiles.length;
    if (n <= 1) {
      setRespuestaSymbols([]);
      return;
    }
    setRespuestaSymbols(oldSyms => {
      const len = n - 1;
      return Array.from({length: len}, (_, i) => oldSyms[i] ?? '<');
    });
  }, [respuestaFiles]);

  const removeRespuesta = (idx) => {
    setRespuestaFiles(files => files.filter((_, i) => i !== idx));
  };

  const toggleSymbol = (idx) => {
    setRespuestaSymbols(syms =>
      syms.map((s, i) => i === idx ? (s === '<' ? '=' : '<') : s)
    );
  };

  // Drag start
  const onDragStart = (e, index) => {
    dragItem.current = index;
  };

  // Drag enter over another
  const onDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  // Drop and reorder
  const onDragEnd = () => {
    const srcIdx = dragItem.current;
    const destIdx = dragOverItem.current;
    if (srcIdx === undefined || destIdx === undefined) return;

    const filesCopy = Array.from(respuestaFiles);
    const [moved] = filesCopy.splice(srcIdx, 1);
    filesCopy.splice(destIdx, 0, moved);

    setRespuestaFiles(filesCopy);
    // limpiar refs
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = null;
    setAdditionalFiles(prev => [...prev, ...files]);
  };

  const removeAdditional = (index) => {
    setAdditionalFiles(files => files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (!title.trim()) throw new Error('El título es requerido');
    if (respuestaFiles.length === 0) throw new Error('Debe agregar al menos una imagen de respuesta');

    const respuestaUrls = respuestaFiles.map(file =>
      `http://localhost:3000/images/${file.name}`
    );
    const adicionalesUrls = additionalFiles.map(file =>
      `http://localhost:3000/images/${file.name}`
    );

    let sequence = [1];
    for (let i = 0; i < respuestaSymbols.length; i++) {
      sequence.push(respuestaSymbols[i] === '<' ? sequence[sequence.length - 1] + 1 : sequence[sequence.length - 1]);
    }

    const payload = {
      titulo: title,
      enunciado: description,
      grado,
      dificultad,
      respuestaImagenes: respuestaUrls,
      respuestaSimbolos: sequence.map(num => num.toString()),
      imagenesAdicionales: adicionalesUrls,
    };
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/pregunta/editar/${preguntaId}`, payload, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        alert('¡Pregunta actualizada exitosamente!');
      } else {
        await axios.post('http://localhost:3001/api/pregunta/crear', payload, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        alert('¡Pregunta guardada exitosamente!');
      }

      navigate('/inicio');
      
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error.message || 'Error al guardar la pregunta');
    }
  };

  return (
    <div className="editor-container">
      <h1 className="page-title">{isEditing ? 'Editar Pregunta' : 'Nueva Pregunta'}
      </h1>
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
                <option value="PRIMARIA_1">1ro de Primaria</option>
                <option value="PRIMARIA_2">2do de Primaria</option>
                <option value="PRIMARIA_3">3ro de Primaria</option>
                <option value="PRIMARIA_4">4to de Primaria</option>
                <option value="PRIMARIA_5">5to de Primaria</option>
                <option value="PRIMARIA_6">6to de Primaria</option>
                <option value="SECUNDARIA_1">1ro de Secundaria</option>
                <option value="SECUNDARIA_2">2do de Secundaria</option>
                <option value="SECUNDARIA_3">3ro de Secundaria</option>
                <option value="SECUNDARIA_4">4to de Secundaria</option>
                <option value="SECUNDARIA_5">5to de Secundaria</option>
                <option value="SECUNDARIA_6">6to de Secundaria</option>
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
                <option value="FACIL">Fácil</option>
                <option value="MEDIO">Medio</option>
                <option value="DIFICIL">Difícil</option>
              </select>
            </div>

            {/* Respuesta (secuencia parcial) con drag-and-drop nativo */}
            <div className="form-group">
              <label>Respuesta (secuencia parcial)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  e.target.value = null; // Para permitir seleccionar la misma imagen nuevamente si se desea
                  setRespuestaFiles(prev => [...prev, ...files]);
                }}
              />

              <ul className="respuesta-list">
                {respuestaFiles.map((file, idx) => (
                  <React.Fragment key={file.name + idx}>
                    <li
                      className="respuesta-item"
                      draggable
                      onDragStart={e => onDragStart(e, idx)}
                      onDragEnter={e => onDragEnter(e, idx)}
                      onDragEnd={onDragEnd}
                    >
                      <div className="img-wrapper">
                        <img
                          src={
                            file.url
                              ? file.url
                              : URL.createObjectURL(file)
                          }
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
                      <li className="symbol-item" onClick={() => toggleSymbol(idx)}>
                        {respuestaSymbols[idx]}
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            {/* Imagen Resultado */}
            <div className="form-group">
              <label>Imágen Resultado</label>
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
                          src={
                            file.url
                              ? file.url
                              : URL.createObjectURL(file)
                          }
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
              {isEditing ? 'Actualizar Pregunta' : 'Guardar Pregunta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}