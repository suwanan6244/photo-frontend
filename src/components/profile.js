import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./profile.css";

export default function UserDetails() {
  const [userData, setUserData] = useState({});
  const [checkouts, setCheckouts] = useState([]);

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
        setCheckouts(data.checkouts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <form className="profile-form">
          <h1>Account</h1>
          Username: {userData.username} <br />
          FirstName: {userData.fname} <br />
          LastName: {userData.lname} <br />
          Email: {userData.email} <br />
        </form>
        <div className="checkout-container">
          <h2>Checkout History</h2>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date</th>
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
                    <td>{product.quantity}</td>
                    <td>${(product.productId.price * product.quantity).toFixed(2)}</td>
                    <td>{checkout.createdAt}</td>
                    <td>
                    <button className="btn btn-primary">
                      download
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