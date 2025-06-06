// src/components/Canvas.js
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import './index.css'

const Canvas = ({ stickers, onDelete, onDragEnd, stageRef }) => {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    stickers.forEach(sticker => {
      if (!loadedImages[sticker.id]) {
        const img = new window.Image();
        img.src = sticker.image;
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [sticker.id]: img }));
        };
      }
    });
  }, [stickers,loadedImages]);

  return (
    <Stage width={600} height={400} ref={stageRef} className='canvas-container'>
      <Layer className="canvas-layer-tag">
        {stickers.map(sticker => (
          <KonvaImage
            key={sticker.id}
            image={loadedImages[sticker.id]}
            x={sticker.x}
            y={sticker.y}
            width={150} // Increase sticker size
            height={150}
            draggable
            onDblClick={() => onDelete(sticker.id)}
            onDragEnd={(e) =>
              onDragEnd(sticker.id, e.target.x(), e.target.y())
            }
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
