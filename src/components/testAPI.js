import React, {  useEffect, useState } from "react";
//import ImagesData from "./datas";
import NavBar from "./navbar";
import { Link } from "react-router-dom";




export default function TestAPI() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/allimage")
          .then(res => res.json())
          .then(
            (result) => {
              setItems(result);
            },
           
          )
      }, [])
        return (
            <div>
                <NavBar />
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
                {items.map((product) => (
                  <div
                  className="p-2 bg-white rounded border border-black-400"
                  key={product._id}
                  >
                          <img 
                            className="w-full h-64 object-cover"
                            src={product.image} 
                            alt={product.title} />

                          <h1 className="font-semibold text-black-800  my-2 leading-8"> 
                               <a href={`/image/${product._id}`}> {product.title}<br/>
                                ${product.price}</a>
                          </h1> {/* แสดงคำอธิบายข้างล่าง */}
                          
                        <Link to={`/image/${product._id}`}>
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
            </div>
  );
}

