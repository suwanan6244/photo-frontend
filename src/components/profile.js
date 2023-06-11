import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./profile.css";

export default function UserDetails() {
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
        setCheckouts(data.checkouts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  const downloadWatermarkedImage = (id) => {
    fetch(`http://localhost:5000/watermarked-images/${id}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setWatermarkedImageUrl(url);
        window.open(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
       
        <div className="checkout-container">
        <form className="profile-form">
          <h1 style={{fontWeight: "bold" ,fontSize: "20px"}}>My Account</h1>
          Username: {userData.username} <br />
          FirstName: {userData.fname} <br />
          LastName: {userData.lname} <br />
          Email: {userData.email} <br />
        </form>
        </div>
    </div>
  );
                }