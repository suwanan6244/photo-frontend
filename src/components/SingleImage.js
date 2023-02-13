
import React, {  useEffect, useState } from "react";
import NavBar from "./navbar";
import { useParams } from "react-router-dom";
import GetDataImage from "./GetData-Image";
//import ImagesData from "./datas";
import "./SingleImagestyle.css";


function SingleImage({ match }) {
  

  const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/allimage/")
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
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={items.image} alt={items.title} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{items.title}</div>
                <div className="product-description">{items.description}</div>
              </div>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${items.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {items.countInStock > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                
                {items.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        {[...Array(items.countInStock).keys()].map((x) => (
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
