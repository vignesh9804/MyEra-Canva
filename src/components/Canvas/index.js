import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import './index.css';

const Canvas = ({ stickers, onDelete, onDragEnd, stageRef }) => {
  const [canvasWidth, setCanvasWidth] = useState(getResponsiveWidth());

  function getResponsiveWidth() {
    return window.innerWidth < 640 ? window.innerWidth * 0.9 : 600;
  }

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(getResponsiveWidth());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasHeight = 400;

  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    stickers.forEach((sticker) => {
      if (!loadedImages[sticker.id]) {
        const img = new window.Image();
        img.src = sticker.image;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [sticker.id]: img }));
        };
      }
    });
  }, [stickers,loadedImages]);

  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      ref={stageRef}
      className="canvas-container"
    >
      <Layer>
        {stickers.map((sticker) =>
          loadedImages[sticker.id] ? (
            <KonvaImage
              key={sticker.id}
              image={loadedImages[sticker.id]}
              x={sticker.x}
              y={sticker.y}
              width={150}
              height={150}
              draggable
              onDblClick={() => onDelete(sticker.id)}
              onDragEnd={(e) =>
                onDragEnd(sticker.id, e.target.x(), e.target.y())
              }
            />
          ) : null
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
