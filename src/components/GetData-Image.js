import React, { useState } from "react";
//import ImagesData from "./datas";
import "./uploadstyle.css";
import CloseIcon from '@mui/icons-material/Close';



function GetDataImage({ result }) {  

    const [model, setModel] = useState(false);
    const [tempimage, setTempImage] = useState('');
    const getImg = (image) =>{
        setTempImage(image);
        setModel(true);
    }
        return (
            <>
            <div className={model ? "model open" : "model"}>
                <img 
                    src={tempimage} 
                    alt={''}/>
                    <CloseIcon onClick={() => setModel(false)} />

            </div>
            <div className="gallery grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
                { result.map((i, index) => (

                        <div 
                            key={index}  
                            className="pics p-2 bg-white rounded border border-black-400"
                            onClick={() => getImg(i.image)}
                            >
                           
                            <img
                                className="w-full h-64 object-cover"
                                src={i.image}
                                alt={i.title}
                            />  
                            <h1 className="font-semibold text-black-800  my-2 leading-8"> 
                                {i.title}<br/>
                                ${i.price}
                            </h1> {/* แสดงคำอธิบายข้างล่าง */}
                           

                            </div>
            ))}
            </div>
            </>
  );
}

export default GetDataImage;
