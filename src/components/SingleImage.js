
import React, {  useEffect, useState } from "react";
import NavBar from "./navbar";
import { useParams } from "react-router-dom";
//import ImagesData from "./datas";
import "./SingleImagestyle.css";


const SingleImage = () => { 
  const { id } = useParams(); 
  const [product, setProduct] = useState({});   

  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/allimage/${id}`);
    const product = await response.json();
    setProduct(product);
  };
  fetchData();
}, [id]);

  return (
    <div>
    <NavBar />
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.title}</div>
                <div className="product-description">{product.description}</div>
              </div>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {product.countInStock > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="round-black-btn">Add To Cart</button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        </div>
        </div>
  )
}

export default SingleImage;
