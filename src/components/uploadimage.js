import React, { useEffect, useState } from "react";
import "./uploadstyle.css";
import NavBar from "./navbar";
import Dropzone from "react-dropzone";
//import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";

export default function UploadImage() {
  const [image, setImage] = useState("");
  const [postDatas, setPostDatas] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetch(`http://localhost:5000/image/${storedUserId}`)
        .then((res) => res.json())
        .then((result) => {
          const userProducts = result.filter((product) => product.sellerId === storedUserId);
          setItems(result);
        });
      }
    }, []);
  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Image required');
      return;
    }
    if (title.length < 3) {
      alert('Title is too short');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
  
    try {
      const userId = window.localStorage.getItem('userId');
  
      const response = await fetch('http://localhost:5000/image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      if (response.ok) {
        const newImage = await response.json();
        setPostDatas(newImage);
        window.location.href = "./uploadimage";
        alert('Upload completed');
      } else {
        throw new Error('Invalid Data');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/image/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerId: userId,
        }),
      });

      if (response.ok) {
        // Remove the deleted image from the items list
        setItems(items.filter((item) => item._id !== id));
        alert("Image deleted successfully");
      } else {
        throw new Error("Failed to delete image");
      }
      
console.log(response.status);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div>
      <NavBar />
      <div className="flex flex-row">
        {/* Image container */}
        <div className="w-3/5 p-4">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="imageUploded"
              className="w-full h-112 object-cover"
            />
          ) : (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="cursor-pointer w-full my-3 text-lg font-bold border-dashed h-72 border-4 border-gray-800 text-black-800 flex items-center justify-center"
                >
                  <input {...getInputProps({ accept: 'image/*' })} />
                  Choose Image
                </div>
              )}
            </Dropzone>
          )}
        </div>
  
        {/* Form container */}
        <div className="w-1/2 p-4">
          <form
            onSubmit={submitHandler}
            className="bg-pink-100 shadow-md rounded lg:w-4/5 md:w-3/5 w-full flex-colo py-4 px-5"
          >
                        <label>Image</label>
            {/* input title */}
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image Title"
              className="w-full my-2 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
            />
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              min="1"
              className="w-full my-2 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
            />
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full my-2 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
            ></textarea>
  
            {/* submit button */}
            <button
              type="submit"
              className="w-100 my-2 h-11 bg-gray-600 py-1 rounded text-white font-bold"
            >
              Publish now
            </button>
          </form>
        </div>
      </div>
      <label className="px-4">My Image</label>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
        {items.map((product) => (
          <div
            className="p-2 bg-white rounded border border-black-400"
            key={product._id}
          >
            <Link to={`/image/${product._id}`}>
              <img
                className="w-full h-64 object-cover"
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
              />
              </Link>
            <h1 className="font-semibold text-black-800  my-2 leading-8">
              <Link to={`/image/${product._id}`}>
                {product.title}<br />${product.price}
              </Link>
            </h1>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"
              onClick={() => deleteHandler(product._id)}     
              >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  

}

