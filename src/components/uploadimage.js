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

  const submitHandler = (e) => {
    e.preventDefault();
    !image
      ? alert("Image require")
      : title.length < 3
      ? alert("title is too short")
      : postData({ title, image, setPostDatas, setpostDataLoading });
  };

  useEffect(() => {
    getData({ setResult, setGetDataLoading });
    if (postDatas) {
      setImage("");
      setTitle("");
      getData({ setResult, setGetDataLoading });
    }
  }, [postDatas]);


        return (
            <div>
            <NavBar />
            <div className="bg-blue-50 px-4 flex-colo sm:px-0">
            <form  
              onSubmit={submitHandler}
              className="bg-blue-100 shadow-md rounded lg:w-2/5 md:w-3/5 w-full flex-colo py-12 px-4">
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
                      className="w-full text-lg font-bold border-dashed h-56 border-4 border-blue-800 text-blue-800"
                    >
                  Choose Image
                </button>
                  )
                }
                
                

                {/* input title */}
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Image Title"
                    className="w-full my-8 bg-white py-4 px-2 rounded border border-blue-800 text-blue-800 font-semibold"
                    />

                {/* submit button */}
                <button
                type="submit"
                className="w-full bg-blue-800 py-4 rounded text-white font-bold"
                > 
                 {postDataLoading ? "Loading..." : "SUBMIT"}
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
                    onError ={(res) => alert(res)}
                    pickerOptions={{
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

