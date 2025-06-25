import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/QuestionEditor.css';

export default function EditQuestionEditor() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [respuestaFiles, setRespuestaFiles] = useState([]);
  const [respuestaSymbols, setRespuestaSymbols] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [grado, setGrado] = useState('PRIMARIA_1');
  const [dificultad, setDificultad] = useState('FACIL');
  const [existingImages, setExistingImages] = useState([]);

  // Cargar pregunta existente al montar
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/obtener/${id}`);
        const pregunta = response.data;
        
        setTitle(pregunta.titulo);
        setDescription(pregunta.enunciado);
        setGrado(pregunta.grado);
        setDificultad(pregunta.dificultad);
        setExistingImages(pregunta.respuestaImagenes);
        setRespuestaSymbols(pregunta.respuestaSimbolos || []);
      } catch (error) {
        console.error('Error cargando pregunta:', error);
        alert('Error al cargar la pregunta');
        navigate('/inicio');
      }
    };
    loadQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      titulo: title,
      enunciado: description,
      grado,
      dificultad,
      respuestaImagenes: [
        ...existingImages,
        ...respuestaFiles.map(file => `C:/ruta/imagenes/${file.name}`)
      ],
      respuestaSimbolos: respuestaSymbols,
      imagenesAdicionales: additionalFiles.map(file => 
        file instanceof File ? `C:/ruta/imagenes/${file.name}` : file
      ),
      autorId: 1
    };

    try {
      await axios.put(`http://localhost:3001/api/editar/${id}`, payload);
      alert('¡Pregunta actualizada exitosamente!');
      navigate('/inicio');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la pregunta');
    }
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
                    multiple
                    onChange={handleRespuestaChange}
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
                            <img src={URL.createObjectURL(file)} alt={`resp-${idx}`} />
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