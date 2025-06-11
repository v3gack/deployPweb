import React, { useState } from 'react';
import '../styles/preguntaCastor.css';

const piezasIniciales = ['pan1', 'lechuga', 'pan2', 'queso', 'jamon'];

export default function CastorAnimation() {
  const [slots, setSlots] = useState(Array(5).fill(null));
  const [tray, setTray] = useState(piezasIniciales);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [resultado, setResultado] = useState(null); // 'correcto' | 'incorrecto' | null

  const handleDrop = (index, pieza) => {
    if (slots[index] !== null) return;
    setSlots((prev) => {
      const nuevasSlots = [...prev];
      nuevasSlots[index] = pieza;
      return nuevasSlots;
    });
    setTray((prev) => prev.filter((p) => p !== pieza));
  };

  const handleReturnToTray = (pieza, index) => {
    setSlots((prev) => {
      const nuevasSlots = [...prev];
      nuevasSlots[index] = null;
      return nuevasSlots;
    });
    setTray((prev) => [...prev, pieza]);
  };

  const verificar = () => {
    const extremos = [slots[0], slots[4]].sort().join(',');
    if (extremos !== ['pan1','pan2'].sort().join(',')) {
      setResultado('incorrecto');
      setMostrarSolucion(true);
      return;
    }

    const medio = [slots[1], slots[2], slots[3]].sort().join(',');
    const esperado = ['lechuga', 'jamon', 'queso'].sort().join(',');
    const esCorrecto = medio === esperado;

    setResultado(esCorrecto ? 'correcto' : 'incorrecto');
    setMostrarSolucion(true);
  };

  const reintentar = () => {
    setSlots(Array(5).fill(null));
    setTray(piezasIniciales);
    setMostrarSolucion(false);
    setResultado(null);
  };

  return (
    <div className="contenedor-principal">
      <h1>ARMA EL SÁNDWICH</h1>
      <p className="enunciado">
        Pablo te pide ayuda para armar su sandwich ya que tiene mucha hambre, tiene tanta
        hambre que no le importa el orden en el cual pongas los ingredientes, a excepcion de los panes,
        solo quiere su sandwich.
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
          <img src="/images/completo.png" alt="castor final" />
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

      {resultado === 'correcto' && (
        <div className="mensaje-resultado correcto">¡Correcto!</div>
      )}
      {resultado === 'incorrecto' && (
        <div className="mensaje-resultado incorrecto">Incorrecto. Intenta de nuevo.</div>
      )}

      {mostrarSolucion && (
        <div className="solucion-correcta">
          <h3>Tu secuencia:</h3>
          <div className="slots">
            {slots.map((pieza, i) => (
              <React.Fragment key={i}>
                <div className="slot">
                  {pieza ? (
                    <img src={`/images/${pieza}.png`} alt={pieza} />
                  ) : (
                    <div className="slot-vacio" />
                  )}
                </div>
                {i < slots.length - 1 && (
                  <span className="flecha" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
            <span className="igual" aria-hidden="true">=</span>
            <div className="slot solucion">
              <img src="/images/completo.png" alt="castor final" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}