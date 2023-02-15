import React, { useState } from 'react';

function PreviewWatermark() {
  const [image, setImage] = useState(null);
  const [watermarkImage, setWatermarkImage] = useState(null);

  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch('http://localhost:5000/uploadimage', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    setWatermarkImage(result.watermark);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      {watermarkImage && (
        <img src={watermarkImage} alt="Watermark" />
      )}
    </div>
  );
}

export default PreviewWatermark;
