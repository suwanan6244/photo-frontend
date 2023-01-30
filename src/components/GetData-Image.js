import React from "react";
//import ImagesData from "./datas";



function GetDataImage({ result }) {  
        return (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
                { result.map((i, index) => (
                        <div 
                            key={index}  
                            className="p-1 bg-white rounded flex-colo border border-blue-400">
                            
                            <img
                                className="w-full h-64 object-cover"
                                src={i.image}
                                alt={i.title}
                            />  
                            <h1 className="font-semibold text-blue-800 italic my-4 leading-8 text-center"> 
                                {i.title}
                            </h1> {/* แสดงคำอธิบายข้างล่าง */}

                            </div>
      ))}
    </div>
  );
}

export default GetDataImage;
