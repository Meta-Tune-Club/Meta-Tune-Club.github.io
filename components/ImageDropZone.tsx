import { useState } from 'react';

const ImageDropZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded" />
      ) : (
        <p>Drag and drop an image here</p>
      )}
    </div>
  );
};

export default ImageDropZone;
