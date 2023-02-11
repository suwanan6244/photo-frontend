import React, {  useEffect, useState } from "react";
import "./uploadstyle.css";
import NavBar from "./navbar";
import GetDataImage from "./GetData-Image";
import { PickerOverlay } from "filestack-react";
import Loading from "./Loading";
import { getData, postData } from "../API/Api";



export default function UploadImage() {
  const [isPicker, setIsPicker] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const [getDataLoading, setGetDataLoading] = useState(true);
  const [postDataLoading, setpostDataLoading] = useState(false);
  const [postDatas, setPostDatas] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [userData, setUserData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    !image
      ? alert("Image require")
      : title.length < 3
      ? alert("title is too short")
      : postData({ title, image, price, countInStock, description, setPostDatas, setpostDataLoading });
  };

  useEffect(() => {
    getData({ setResult, setGetDataLoading });
    if (postDatas) {
      setImage("");
      setTitle("");
      setPrice("");
      setDescription("");
      setCountInStock("");
      getData({ setResult, setGetDataLoading });
    }
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
        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./signin";
        }
      });
  }, [postDatas]);


        return (
            <div>
            <NavBar />
            <div className="px-1 flex-colo sm:px-0">
            <form  
              onSubmit={submitHandler}
              className="bg-pink-100 shadow-md rounded lg:w-2/5 md:w-3/5 w-full flex-colo py-11 px-4">
                {image ? (
                    <img
                    src={image && image.filesUploaded[0].url}
                    alt="imageUploded"
                    className="w-full h-56 object-cover"
                    />
                  ) : (
                    <button
                      onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                      type="button"
                      className="w-full text-lg font-bold border-dashed h-56 border-4 border-gray-800 text-black-800"
                    >
                  Choose Image
                </button>
                  )
                }
                
                

                {/* input title */}
                <label>
                      Title
                </label>
                <input 
                  
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Image Title"
                    className="w-full my-3 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
                    />
                <input 
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    min="1"
                    className="w-full my-3 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
                    />
                <input 
                    type="number"
                    required
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder="Count In Stock"
                    min="1"
                    className="w-full my-3 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
                    />
                 <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full my-3 bg-white py-2.5 px-2 rounded border border-black-800 text-black-800 font-semibold"
                    ></textarea>
                    

                {/* submit button */}
                <button
                type="submit"
                className="w-100 h-11 bg-gray-600 py-1 rounded text-white font-bold"
                > 
                 {postDataLoading ? "Loading..." : "Publish now"}
                </button>

                {/* Filestack */}
                <div className="mt-4 relative">
                {isPicker && (
                  <PickerOverlay
                    apikey={"AukiHevGSBy5LqPlyoA3vz"}
                    onSuccess={(res) => {
                      setImage(res);
                      setIsPicker(false);
                    }}
                    pickerOptions={{ 
                      fromSources: [ 'local_file_system'],
                      maxFiles: 1,
                      accept: ["image/*"],
                      errorsTimeout:2000,
                      maxSize:1 * 1000 * 900,
                    }}
                  />
                    )}
                </div>
              </form>
              {getDataLoading && <Loading />}
              <GetDataImage result={result} />
          </div>
          </div>
        );
    
}

