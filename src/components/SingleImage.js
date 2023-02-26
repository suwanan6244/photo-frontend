import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import { useParams } from "react-router-dom";
import "./SingleImagestyle.css";

const SingleImage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/allimage/${id}`);
      const product = await response.json();
      setProduct(product);
    };
    fetchData();
  }, [id]);

  
  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          productId: product._id,
          quantity,
        }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Error adding product to cart");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} />
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
            
                <button className="round-black-btn" onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
