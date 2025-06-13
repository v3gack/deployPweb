import React, { useState, useRef } from 'react';
import './PuzzleRotate.css';
import { FaEdit } from "react-icons/fa";

const PuzzleRotateEditable = () => {
  const [pieces, setPieces] = useState(Array(9).fill(null));
  const [isSolved, setIsSolved] = useState(false);
  const [validSolutions, setValidSolutions] = useState(() => {
    const stored = localStorage.getItem('validSolutions');
    return stored ? JSON.parse(stored) : [];
  });

  const fileInputRefs = useRef(Array(9).fill(null).map(() => React.createRef()));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const updatedPieces = [...pieces];

    for (let file of files) {
      const firstEmpty = updatedPieces.findIndex(p => p === null);
      if (firstEmpty === -1) break;
      updatedPieces[firstEmpty] = {
        id: `${Date.now()}-${Math.random()}`,
        src: URL.createObjectURL(file),
        rotation: 0,
      };
    }

    setPieces(updatedPieces);
    setIsSolved(false);
  };

  const handleReplace = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updated = [...pieces];
    if (updated[index]) {
      updated[index] = {
        ...updated[index],
        src: URL.createObjectURL(file),
      };
      setPieces(updated);
    }
  };

  const rotateLeft = (index) => {
    const updated = [...pieces];
    if (updated[index]) {
      updated[index].rotation = (updated[index].rotation - 90 + 360) % 360;
      setPieces(updated);
    }
  };

  const rotateRight = (index) => {
    const updated = [...pieces];
    if (updated[index]) {
      updated[index].rotation = (updated[index].rotation + 90) % 360;
      setPieces(updated);
    }
  };

  const checkPuzzle = () => {
    const current = pieces.map(p => p?.rotation ?? 0);
    const match = validSolutions.some(solution =>
      solution.length === current.length &&
      solution.every((val, idx) => (val % 360) === current[idx])
    );
    setIsSolved(match);
  };

  const saveCurrentAsSolution = () => {
    const current = pieces.map(p => p?.rotation ?? 0);
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
      <h2 className="puzzle-title">Puzzle con carga individual y reemplazo</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-4"
      />

      <div className="puzzle-grid">
        {pieces.map((piece, index) => (
          <div
            className="puzzle-cell"
            key={index}
            onClick={() => fileInputRefs.current[index].current.click()}
          >
            {piece ? (
  <>
    <button className="rotate-button left" onClick={(e) => { e.stopPropagation(); rotateLeft(index); }}>⟲</button>
    <img
      src={piece.src}
      alt={`pieza-${index}`}
      className="puzzle-piece"
      style={{ transform: `rotate(${piece.rotation}deg)` }}
    />
    <button className="rotate-button right" onClick={(e) => { e.stopPropagation(); rotateRight(index); }}>⟳</button>
    <div className="replace-hint"> <FaEdit  size="25px"  /> </div>
  </>
) : (
  <div className="empty-cell" />
)}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRefs.current[index]}
              onChange={(e) => handleReplace(e, index)}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={checkPuzzle} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Verificar
        </button>
        <button onClick={saveCurrentAsSolution} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Guardar como solución válida
        </button>
      </div>

      {isSolved && <p className="text-green-600 font-semibold mt-4">¡Puzzle resuelto correctamente!</p>}
    </div>
  );
};

export default PuzzleRotateEditable;
