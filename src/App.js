import { useRef, useState } from 'react';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';
import './App.css';

const App = () => {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef(null);
  const offset = 40;
  const [stickerCount, setStickerCount] = useState(0);
  const star = "/assets/star.png";
  const heart = "/assets/heart.png";
  const laugh = "/assets/laugh.png";


  const handleAddSticker = (imageSrc) => {
    const newSticker = {
      id: Date.now(),
      image: imageSrc,
      x: 50 + (stickerCount % 10) * offset,
      y: 50 + (stickerCount % 10) * offset,
    };
    setStickers([...stickers, newSticker]);
    setStickerCount(stickerCount + 1);
  };

  const handleDeleteSticker = (id) => {
    setStickers(stickers.filter(sticker => sticker.id !== id));
  };

  const handleDragEnd = (id, x, y) => {
    const snappedX = Math.round(x / 40) * 40;
    const snappedY = Math.round(y / 40) * 40;
    setStickers(stickers.map(sticker =>
      sticker.id === id ? { ...sticker, x: snappedX, y: snappedY } : sticker
    ));
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Sticker Canvas Playground</h1>
      <Canvas
        stickers={stickers}
        onDelete={handleDeleteSticker}
        onDragEnd={handleDragEnd}
        stageRef={stageRef}
      />
      <div className="button-panel">
        <div>
          <StickerButton imageSrc={star} onClick={handleAddSticker} />
          <StickerButton imageSrc={heart} onClick={handleAddSticker} />
          <StickerButton imageSrc={laugh} onClick={handleAddSticker} />
        </div>
        <button onClick={handleDownload} className='download-button'>Download</button>
      </div>
    </div>
  );
};

export default App;
