import React from "react";
//import ImagesData from "./datas";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

import ImagesData from "./datas";



const Test = () => {  

        return (
            <div>
                <NavBar />
                <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {ImagesData.map((product) => (
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
                        <Link to={`/imageapi/${product._id}`}>
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

export default Test;
