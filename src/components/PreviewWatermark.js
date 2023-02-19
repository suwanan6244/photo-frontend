import React, { useState, useEffect } from 'react';

const WatermarkedImage = ({ id }) => {
  const [watermarkedImage, setWatermarkedImage] = useState(null);

  useEffect(() => {
    fetch(`/api/watermarked-images/${id}`)
      .then((response) => response.blob())
      .then((data) => {
        const url = window.URL.createObjectURL(data);
        setWatermarkedImage(url);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      {watermarkedImage && (
        <div>
          <img src={watermarkedImage} alt="Watermarked" />
          <a href={watermarkedImage} download>
            Download Watermarked Image
          </a>
        </div>
      )}
    </div>
  );
};

export default WatermarkedImage;
