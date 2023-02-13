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
                <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {items.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                        <div className="shopBack">
                          <img src={product.image} alt={product.title} />
                        </div>

                      <div className="shoptext">
                      <h3>{product.title}</h3>
                        <h3>${product.price}</h3>
                        <Link to={`/image/${product._id}`}>
                            <button type="submit" className="btn btn-primary">
                                view
                            </button>
                            <button type="submit" className="btn btn-primary">
                                view
                            </button>
                            </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>
  );
}

