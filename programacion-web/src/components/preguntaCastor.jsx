import React, { useState } from 'react';
import './preguntaCastor.css';

const piezas = ['castor1', 'castor2', 'castor3', 'castor4', 'castor5'];
const solucion = ['castor2', 'castor4', 'castor3', 'castor1', 'castor5'];

export default function CastorAnimation() {
  const [slots, setSlots] = useState(Array(5).fill(null));
  const [tray, setTray] = useState(piezas);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [resultado, setResultado] = useState(null); // 'correcto' | 'incorrecto' | null

  const handleDrop = (index, pieza) => {
    const nuevasSlots = [...slots];
    if (!nuevasSlots[index]) {
      nuevasSlots[index] = pieza;
      setSlots(nuevasSlots);
      setTray(prev => prev.filter(p => p !== pieza));
    }
  };

  const handleReturnToTray = (pieza, index) => {
    const nuevasSlots = [...slots];
    nuevasSlots[index] = null;
    setSlots(nuevasSlots);
    setTray(prev => [...prev, pieza]);
  };

  const verificar = () => {
    const esCorrecto = solucion.every((item, i) => slots[i] === item);
    setResultado(esCorrecto ? 'correcto' : 'incorrecto');
    setMostrarSolucion(true);  
  };

  const reintentar = () => {
    setSlots(Array(5).fill(null));
    setTray(piezas);
    setMostrarSolucion(false);
    setResultado(null);
  };

  return (
    <div className="contenedor-principal">
      <h1>Ordena la animación del castor</h1>
      <p className="enunciado">
        Ordena los frames de animación del castor para obtener la solución al final de la secuencia. 
        Para poder ser una animación fluida, solamente se puede hacer un cambio en el aspecto del castor.
      </p>

      <div className="slots">
        {slots.map((pieza, i) => (
          <React.Fragment key={i}>
            <div
              className="slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(i, e.dataTransfer.getData('pieza'))}
            >
              {pieza && (
                <img
                  src={`/images/${pieza}.png`}
                  alt={pieza}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('pieza', pieza)}
                  onDoubleClick={() => handleReturnToTray(pieza, i)}
                />
              )}
            </div>
            {i < slots.length - 1 && (
              <span className="flecha" aria-hidden="true">→</span>
            )}
          </React.Fragment>
        ))}
        <span className="igual" aria-hidden="true">=</span>
        <div className="slot solucion">
          <img src="/images/castorSolucion.png" alt="castor final" />
        </div>
      </div>

      <div className="bandeja">
        {tray.map((pieza) => (
          <img
            key={pieza}
            src={`/images/${pieza}.png`}
            alt={pieza}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('pieza', pieza)}
          />
        ))}
      </div>

      <div className="botones">
        <button className="verificar" onClick={verificar}>Verificar</button>
        <button className="reintentar" onClick={reintentar}>Reintentar</button>
      </div>

      {/* Mensaje de resultado */}
      {resultado === 'correcto' && (
        <div className="mensaje-resultado correcto">¡Correcto!</div>
      )}
      {resultado === 'incorrecto' && (
        <div className="mensaje-resultado incorrecto">Incorrecto. Intenta de nuevo.</div>
      )}

      {mostrarSolucion && (
        <div className="solucion-correcta">
          <h3>Solución correcta:</h3>
          <div className="slots">
            {solucion.map((pieza, i) => (
              <React.Fragment key={i}>
                <div className="slot">
                  <img src={`/images/${pieza}.png`} alt={pieza} />
                </div>
                {i < solucion.length - 1 && (
                  <span className="flecha" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
            <span className="igual" aria-hidden="true">=</span>
            <div className="slot solucion">
              <img src="/images/castorSolucion.png" alt="castor final" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}