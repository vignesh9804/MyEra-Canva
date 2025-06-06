import './index.css'

const StickerButton = ({ imageSrc, onClick }) => {
  return (
    <button onClick={() => onClick(imageSrc)} className="sticker-button">
      <img src={imageSrc} alt="sticker" className='sticker-button-inner-emoji'/>
    </button>
  );
};

export default StickerButton;
