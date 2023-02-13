import React, { useState } from "react";
import Navbar from "./navbar";

const PreviewWatermark = () => {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:5000/checkWatermark", {
      method: "POST",
      body: formData,
      

    });
    const verificationResult = await response.text();
    setResult(verificationResult);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
        <Navbar />
      <input type="file" onChange={handleUpload} />
      <p>{result}</p>
      <img src={preview} alt="Watermarked image preview" />
    </div>
  );
};

export default PreviewWatermark;