import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/preguntaCastor.css';

export default function Pregunta() {
  const { id } = useParams();
  const [datos, setDatos] = useState(null);
  const [slots, setSlots] = useState([]);
  const [tray, setTray] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);

  // Función para mezclar un arreglo (Fisher-Yates shuffle)
  const mezclarArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/obtener/${id}`);
        const data = res.data;

        setDatos(data);

        // Crear objetos con id único y url
        const trayConIds = data.respuestaImagenes.map((url, i) => ({
          id: `${i}-${Date.now()}-${Math.random()}`,
          url,
        }));

        // Mezclar las imágenes para que aparezcan desordenadas en la bandeja
        const trayMezclado = mezclarArray(trayConIds);

        setTray(trayMezclado);
        setSlots(new Array(trayConIds.length).fill(null));
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };

    fetchDatos();
  }, [id]);

  const handleDrop = (index, piezaJSON) => {
    const pieza = JSON.parse(piezaJSON);

    if (slots[index]?.id === pieza.id) return;
    if (slots[index] !== null) return;

    setSlots((prev) => {
      // Elimina la pieza de cualquier slot donde ya esté
      const nuevos = prev.map((p, i) => (p?.id === pieza.id ? null : p));
      nuevos[index] = pieza;
      return nuevos;
    });

    setTray((prev) => prev.filter((p) => p.id !== pieza.id));
  };


  const handleReturn = (pieza, index) => {
    setSlots((prev) => {
      const nuevos = [...prev];
      nuevos[index] = null;
      return nuevos;
    });
    setTray((prev) => [...prev, pieza]);
  };

  const verificar = () => {
    if (!datos || !datos.respuestaSimbolos || !datos.respuestaImagenes) {
      alert('La pregunta no tiene datos suficientes para validar.');
      return;
    }

    const ordenEsperado = datos.respuestaSimbolos.map((s) => parseInt(s, 10));
    const esOrdenParcial = (valor) =>
      ordenEsperado.filter((n) => n === valor).length > 1;

    const respuestaIndices = slots.map((pieza) => {
      if (!pieza) return -1;
      return datos.respuestaImagenes.findIndex((url) => url === pieza.url);
    });

    let esCorrecto = true;

    for (let i = 0; i < ordenEsperado.length; i++) {
      const actualIndex = respuestaIndices[i];

      if (actualIndex === -1) {
        esCorrecto = false;
        break;
      }

      const valorEsperado = ordenEsperado[i];
      const valorActual = ordenEsperado[actualIndex];

      if (esOrdenParcial(valorEsperado)) {
        if (valorActual !== valorEsperado) {
          esCorrecto = false;
          break;
        }
      } else {
        if (actualIndex !== i) {
          esCorrecto = false;
          break;
        }
      }
    }

    setResultado(esCorrecto ? 'correcto' : 'incorrecto');
    setMostrarSolucion(true);
  };

  const generarPrimeraSecuenciaCorrecta = () => {
    const simbolos = datos.respuestaSimbolos.map(Number);
    const imagenes = datos.respuestaImagenes;

    const grupos = {};

    simbolos.forEach((s, i) => {
      if (!grupos[s]) grupos[s] = [];
      grupos[s].push(imagenes[i]);
    });

    const clavesOrdenadas = Object.keys(grupos).map(Number).sort((a, b) => a - b);
    return clavesOrdenadas.flatMap((k) => grupos[k]);
  };

  const reintentar = () => {
    const trayConIds = datos.respuestaImagenes.map((url, i) => ({
      id: `${i}-${Date.now()}-${Math.random()}`,
      url,
    }));

    // Mezclar en reintentar para mayor dificultad
    const trayMezclado = mezclarArray(trayConIds);

    setTray(trayMezclado);
    setSlots(new Array(trayConIds.length).fill(null));
    setResultado(null);
    setMostrarSolucion(false);
  };

  if (!datos) return <p>Cargando...</p>;

  return (
    <div className="contenedor-principal">
      <h1>{datos.titulo}</h1>
      <p className="enunciado">{datos.enunciado}</p>

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
                  src={pieza.url}
                  alt={`pieza-${i}`}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData('pieza', JSON.stringify(pieza))
                  }
                  onDoubleClick={() => handleReturn(pieza, i)}
                />
              )}
            </div>
            {i < slots.length - 1 && <span className="flecha">→</span>}
          </React.Fragment>
        ))}
        <span className="igual">=</span>
        <div className="slot solucion">
          <img
            src={datos.imagenesAdicionales[0]}
            alt="resultado final"
            draggable={false}
            style={{ cursor: 'default' }}
          />
        </div>
      </div>

      <div className="bandeja">
        {tray.map((pieza) => (
          <img
            key={pieza.id}
            src={pieza.url}
            alt={`tray-${pieza.id}`}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('pieza', JSON.stringify(pieza))
            }
          />
        ))}
      </div>

      <div className="botones">
        <button className="verificar" onClick={verificar}>
          Verificar
        </button>
        <button className="reintentar" onClick={reintentar}>
          Reintentar
        </button>
      </div>

      {resultado === 'correcto' && (
        <div className="mensaje-resultado correcto">¡Correcto!</div>
      )}
      {resultado === 'incorrecto' && (
        <div className="mensaje-resultado incorrecto">
          Incorrecto. Intenta de nuevo.
        </div>
      )}

      {mostrarSolucion && resultado === 'incorrecto' && (
        <div className="solucion-correcta">
          <h3>secuencia válida:</h3>
          <div className="slots">
            {generarPrimeraSecuenciaCorrecta().map((pieza, i) => (
              <React.Fragment key={i}>
                <div className="slot">
                  <img src={pieza} alt={`solucion-${i}`} />
                </div>
                {i < datos.respuestaImagenes.length - 1 && (
                  <span className="flecha">→</span>
                )}
              </React.Fragment>
            ))}
            <span className="igual">=</span>
            <div className="slot solucion">
              <img src={datos.imagenesAdicionales[0]} alt="resultado final" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}