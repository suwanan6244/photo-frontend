import React, { useState } from 'react';
import NavBar from "./navbar";
import "./Extractstyle.css";
import Dropzone from "react-dropzone";
import jsQR from "jsqr";


function ExtractWatermark() {
  const [image, setImage] = useState(null);
  const [watermark, setWatermark] = useState(null);
  const [qrCodeText, setQrCodeText] = useState(null);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
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

  const handleReadQrCode = async () => {
    const response = await fetch(watermark);
    const imageBlob = await response.blob();
  
    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);
    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setQrCodeText(code.data);
        console.log('QR Code text:', code.data);
      } else {
        alert('No QR Code found.');
      }
    };
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
      <div className="row">
        <div className="flex flex-row">
          <div className="col-md-5 p-6 ml-12">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="cursor-pointer w-full my-6 text-lg font-bold border-dashed h-96 border-4 border-gray-800 text-black-800 flex items-center justify-center"
                >
                  <input
                    {...getInputProps({ accept: 'image/*' })}
                    id="dropzoneInput"
                  />
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="imageUploded"
                      className="w-full h-112 object-contain"
                    />
                  ) : (
                    "Choose Image"
                  )}
                </div>
              )}
            </Dropzone>
            <button
              onClick={() => {
                document.getElementById('dropzoneInput').click();
                setImage(null); // Clear the image state
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"
            >
              Choose Image
            </button>
          </div>


          <div className="col-md-5 p-6 ml-12">
            <div className=" w-full my-6 text-lg font-bold border-dashed h-96 border-4 border-gray-800 text-black-800 flex items-center justify-center">
              {watermark && <img src={watermark} alt="Extracted Watermark" />}
            </div>
            <div>
              <button
                onClick={handleExtractWatermark}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"
              >
                Extract Watermark
              </button>
              {watermark && (
                <button
                  onClick={handleReadQrCode}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"
                >
                  Read QR Code
                </button>
              )}
              {qrCodeText && <div>QR Code text: {qrCodeText}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtractWatermark;
