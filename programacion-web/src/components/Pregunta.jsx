import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import '../styles/Pregunta.css';

const ItemTypes = { PIEZA: "pieza" };

const Pieza = ({ pieza, origen }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PIEZA,
    item: { pieza, from: origen },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (

    <div
      ref={drag}
      className="pieza"
      style={{
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1, // Esta opacidad mantiene visible la pieza original
        zIndex: isDragging ? 100 : 'auto',
      }}
    >
      <img 
        src={pieza.src} 
        alt={`pieza-${pieza.id}`} 
        className="pieza-img" 
      />
    </div>
  );
};

const Slot = ({ pieza, index, colocarEnSlot }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PIEZA,
    drop: (item) => colocarEnSlot(item, index),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      className="slot"
      style={{
        borderColor: isOver ? (canDrop ? "green" : "red") : "#bbb"
      }}
    >
      {pieza && <img src={pieza.src} alt={`slot-${index}`} className="pieza-img" />}
    </div>
  );
};

const Pool = ({ pool, devolverAlPool }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.PIEZA,
    drop: (item) => {
      if (item.from === "slot") {
        devolverAlPool(item);
      }
    }
  });

  return (
    <div ref={drop} className="pool-wrapper">
      {pool.map(pieza => (
        <Pieza key={pieza.id} pieza={pieza} origen="pool" />
      ))}
    </div>
  );
};

const Pregunta = () => {
  const [pool, setPool] = useState([
    { id: 2, src: "/images/SerpienteP2.png" },
    { id: 1, src: "/images/SerpienteP1.png" },
    { id: 4, src: "/images/SerpienteP4.png" },
    { id: 3, src: "/images/SerpienteP3.png" }
  ]);
  const [slots, setSlots] = useState([null, null, null, null]);
  const [confirmado, setConfirmado] = useState(false);
  const [resultadoVisible, setResultadoVisible] = useState(false);
  const [esRespuestaCorrecta, setEsRespuestaCorrecta] = useState(false);

  const colocarEnSlot = useCallback(({ pieza, from }, index) => {
    setSlots(prev => {
      const nuevo = [...prev];
      nuevo[index] = pieza;
      return nuevo;
    });

    if (from === "pool") {
      setPool(prev => prev.filter(p => p.id !== pieza.id));
    } else if (from === "slot") {
      setSlots(prev => {
        const nuevo = [...prev];
        const idx = nuevo.findIndex(p => p?.id === pieza.id);
        if (idx !== -1) nuevo[idx] = null;
        return nuevo;
      });
    }
  }, []);

  const devolverAlPool = useCallback(({ pieza }) => {
    setPool(prev => [...prev, pieza]);
    setSlots(prev => {
      const nuevo = [...prev];
      const idx = nuevo.findIndex(p => p?.id === pieza.id);
      if (idx !== -1) nuevo[idx] = null;
      return nuevo;
    });
  }, []);

  const verificar = () => {
    const ordenUsuario = slots.map(p => p?.id ?? 0);
    const correcto = [1, 2, 3, 4];
    const esCorrecta = JSON.stringify(ordenUsuario) === JSON.stringify(correcto);
    
    setConfirmado(true);
    setResultadoVisible(true);
    setEsRespuestaCorrecta(esCorrecta);
  };

  const resetear = () => {
    // Devolver todas las piezas al pool
    const todasLasPiezas = [
      { id: 1, src: "/images/SerpienteP1.png" },
      { id: 2, src: "/images/SerpienteP2.png" },
      { id: 3, src: "/images/SerpienteP3.png" },
      { id: 4, src: "/images/SerpienteP4.png" }
    ];
    
    setPool(todasLasPiezas);
    setSlots([null, null, null, null]);
    setConfirmado(false);
    setResultadoVisible(false);
  };

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const backend = isTouch ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend} options={{ 
      ...(isTouch ? { enableMouseEvents: true } : {}), 
      // Habilita la vista previa del arrastre para ambos backends
      enablePreview: true, 
    }}>
      <div className="pregunta-container">
        <h1 className="titulo-pregunta">Pregunta 1</h1>
        <h2 className="pregunta-title">
          Ordena las piezas para reconstruir la figura:
        </h2>

        <div className="responsive-wrapper">
          <div className="slots-wrapper">
            {slots.map((pieza, i) => (
              <Slot
                key={i}
                pieza={pieza}
                index={i}
                colocarEnSlot={confirmado ? () => {} : colocarEnSlot}
              />
            ))}
          </div>

          <Pool pool={pool} devolverAlPool={confirmado ? () => {} : devolverAlPool} />
        </div>

        <div className="boton-wrapper">
          {!confirmado ? (
            <button
              onClick={verificar}
              className="confirm-btn"
              disabled={slots.includes(null)}
            >
              Confirmar respuesta
            </button>
          ) : (
            <button
              onClick={resetear}
              className="reset-btn"
            >
              Intentar de nuevo
            </button>
          )}
        </div>

        {resultadoVisible && (
          <div className={`resultado-container ${esRespuestaCorrecta ? 'correcto' : 'incorrecto'}`}>
            <h3>{esRespuestaCorrecta ? "¡Correcto!" : "Incorrecto, inténtalo de nuevo."}</h3>
            <div className="respuesta-correcta">
              <p>Respuesta correcta:</p>
              <div className="imagen-completa">
                <img src="/images/SerpienteCompleto.png" alt="Serpiente completa" />
              </div>
              <div className="piezas-ordenadas">
                <img src="/images/SerpienteP1.png" alt="Pieza 1" />
                <img src="/images/SerpienteP2.png" alt="Pieza 2" />
                <img src="/images/SerpienteP3.png" alt="Pieza 3" />
                <img src="/images/SerpienteP4.png" alt="Pieza 4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Pregunta;