import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragDrop.css';

const ItemTypes = {
  IMAGE: 'image',
};

const DraggableImage = ({ image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { id: image.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [image]);

  return (
    <img
      ref={drag}
      src={image.src}
      alt=""
      className={`dragdrop-image ${isDragging ? 'dragging' : ''}`}
    />
  );
};

const DropZone = ({ onDrop, correctIds, droppedIds }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [droppedIds]);

  const isCorrect = droppedIds.every((id) => correctIds.includes(id)) && droppedIds.length === correctIds.length;

  return (
    <div
      ref={drop}
      className={`dropzone ${isOver ? 'hover' : ''} ${isCorrect ? 'correct' : ''}`}
    >
      {droppedIds.length === 0 ? (
        <p className="dropzone-placeholder">Arrastra las imágenes aquí</p>
      ) : (
        droppedIds.map((id) => (
          <span key={id} className="text-sm px-2">{id}</span>
        ))
      )}
    </div>
  );
};

const DragDrop = () => {
  const images = [
    { id: 'gato', src: '/images/gato.jpg' },
    { id: 'perro', src: '/images/perro.jpg' },
    { id: 'tigre', src: '/images/tigre.jpg' },
    { id: 'pato', src: '/images/pato.jpg' },
  ];

  const correctAnswers = ['gato','tigre'];
  const [dropped, setDropped] = useState([]);

  const handleDrop = (id) => {
    if (!dropped.includes(id)) {
      setDropped([...dropped, id]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dragdrop-container">
        <h2 className="dragdrop-title">Arrastra los felinos a la caja</h2>

        <div className="dragdrop-flex">
          <div className="dragdrop-images">
            {images.map((img) => (
              <DraggableImage key={img.id} image={img} />
            ))}
          </div>

          <div className="flex-1">
            <DropZone
              onDrop={handleDrop}
              correctIds={correctAnswers}
              droppedIds={dropped}
            />

            {dropped.length === correctAnswers.length &&
              dropped.every((id) => correctAnswers.includes(id)) && (
                <p className="correct-message">¡Correcto!</p>
              )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDrop;
