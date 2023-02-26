import React, { useState } from 'react';
import NavBar from "./navbar";
import "./Extractstyle.css";


function ExtractWatermark() {
  const [image, setImage] = useState(null);
  const [watermark, setWatermark] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleExtractWatermark = async () => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await fetch('http://localhost:5000/extract-watermark', {
        method: 'POST',
        body: formData,
      });
      const data = await response.blob();
      const imageURL = URL.createObjectURL(data);
      setWatermark(imageURL);
    } catch (error) {
      console.log(error);
    }
  };

  fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          if (data.data === "token expired") {
            alert("Token expired login again");
            window.localStorage.clear();
            window.location.href = "./signin";
          }
        });


  return (
    <div>
      <NavBar />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div className="row">
        <div className="col-md-6">
          <div className="extract-image w-full my-3 mx-4 border-dashed border-4 border-gray-800 flex items-center justify-center">
            {image && <img src={URL.createObjectURL(image)} alt="Select Image" />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="extract2-image">
            {watermark && <img src={watermark} alt="Extracted Watermark" />}
          </div>
        </div>
      </div>
      <button onClick={handleExtractWatermark}>Extract Watermark</button>
    </div>
  );
}

export default ExtractWatermark;
