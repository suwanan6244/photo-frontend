import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./purchased.css";
import moment from 'moment-timezone';


export default function Purchased() {
  const [userData, setUserData] = useState({});
  const [checkouts, setCheckouts] = useState([]);
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./signin";
        } else {
          setUserData(data.data);
        }
      });
  }, []);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    const buyerId = storedUserId ? storedUserId : this.props.userId;
    fetch(`http://localhost:5000/checkout/${buyerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.checkouts);
        const sortedCheckouts = data.checkouts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCheckouts(sortedCheckouts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);
  
  

  const downloadWatermarkedImage = (id, title) => {
    fetch(`http://localhost:5000/watermarked-images/${id}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${title}.jpg`); // Use the image title as the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };




  return (
    <div>
      <NavBar />
      <div>

        <div className="container">
          <h2 style={{ paddingLeft: "60px", paddingTop: "25px", fontWeight: "bold", fontSize: "20px" }}>Purchase History</h2>
          <table className="table table-bordered mt-4 table-small">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Purchase date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {checkouts.map((checkout) =>
                checkout.products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="cart-item">
                        <img
                          src={`http://localhost:5000/uploads/${product.productId.image}`}
                          alt={product.productId.title}
                          style={{ width: "100px" }} />

                        <div className="cart-item-details">
                          <div className="cart-item-title">{product.productId.title}</div>
                          <div className="cart-item-seller">Sold by {product.productId.sellerId.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>${product.productId.price.toFixed(2)}</td>
                    <td>{moment(checkout.createdAt).tz("Asia/Bangkok").format('ddd, DD. MMMM YYYY HH:mm:ss')}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => downloadWatermarkedImage(product.productId._id, product.productId.title)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}