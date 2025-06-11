import React, { useState, useEffect } from 'react';
import './PuzzleRotate.css';

const PuzzleRotate = () => {
  const initialPieces = [
    { id: 1, src: '/images/piece1.png', rotation: 90 },
    { id: 2, src: '/images/piece2.png', rotation: 0 },
    { id: 3, src: '/images/piece3.png', rotation: 270 },
    { id: 4, src: '/images/piece4.png', rotation: 90 },
    { id: 5, src: '/images/piece5.png', rotation: 0 },
    { id: 6, src: '/images/piece6.png', rotation: 270 },
    { id: 7, src: '/images/piece7.png', rotation: 180 },
    { id: 8, src: '/images/piece8.png', rotation: 0 },
    { id: 9, src: '/images/piece9.png', rotation: 90 },
  ];

  const [pieces, setPieces] = useState(initialPieces);
  const [isSolved, setIsSolved] = useState(false);
  const [validSolutions, setValidSolutions] = useState(() => {
    const stored = localStorage.getItem('validSolutions');
    return stored ? JSON.parse(stored) : [];
  });

  const rotateLeft = (index) => {
    setPieces(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, rotation: (p.rotation - 90 + 360) % 360 } : p
      )
    );
  };

  const rotateRight = (index) => {
    setPieces(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p
      )
    );
  };

  const checkPuzzle = () => {
    const current = pieces.map(p => p.rotation % 360);
    const match = validSolutions.some(solution =>
      Array.isArray(solution) &&
      solution.length === current.length &&
      solution.every((val, idx) => (val % 360) === current[idx])
    );
    setIsSolved(match);
  };

  const saveCurrentAsSolution = () => {
    const current = pieces.map(p => p.rotation % 360);
    const alreadyExists = validSolutions.some(solution =>
      solution.every((val, idx) => val % 360 === current[idx])
    );

    if (!alreadyExists) {
      const updated = [...validSolutions, current];
      setValidSolutions(updated);
      localStorage.setItem('validSolutions', JSON.stringify(updated));
      alert('Solución guardada correctamente.');
    } else {
      alert('Esta solución ya existe.');
    }
  };

  return (
    <div className="puzzle-container">
      <h2 className="puzzle-title">Gira las piezas para formar la imagen correcta</h2>
      <div className="puzzle-grid">
        {pieces.map((piece, index) => (
          <div
            className="puzzle-cell"
            key={piece.id}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            <button
              className="rotate-button left"
              onClick={() => rotateLeft(index)}
            >
              ⟲
            </button>
            <img
              src={piece.src}
              alt={`pieza-${piece.id}`}
              className="puzzle-piece"
              style={{ transform: `rotate(${piece.rotation}deg)` }}
            />
            <button
              className="rotate-button right"
              onClick={() => rotateRight(index)}
            >
              ⟳
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={checkPuzzle}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Verificar
        </button>

        <button
          onClick={saveCurrentAsSolution}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Guardar como solución válida
        </button>
      </div>

      {isSolved && (
        <p className="text-green-600 font-semibold mt-4">¡Puzzle resuelto correctamente!</p>
      )}
    </div>
  );
};

export default PuzzleRotate;
