import React, { useState } from "react";
//import ImagesData from "./datas";
import "./uploadstyle.css";
import { Link } from "react-router-dom";




function GetDataImage({ result }) {  

        return (
            <>
            
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
                { result.map((image) => (

                        <div 
                            key={image._id}  
                            className="p-2 bg-white rounded border border-black-400"
                            >
                           
                            <img
                                className="w-full h-64 object-cover"
                                src={image.image}
                                alt={image.title}
                            />  
                            <h1 className="font-semibold text-black-800  my-2 leading-8"> 
                               <a href={`/image/${image._id}`}> {image.title}<br/>
                                ${image.price}</a>
                            </h1> {/* แสดงคำอธิบายข้างล่าง */}
                            <Link to={`/image/${image._id}`}>
                            <button type="submit" className="btn btn-primary">
                                view
                            </button>
                            <button type="submit" className="btn btn-primary">
                                view
                            </button>
                            </Link>
                            </div>
            ))}
            </div>
            </>
  );
}

export default GetDataImage;
