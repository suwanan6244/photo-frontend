import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./profile.css";

export default function UserDetails() {
  const [userData, setUserData] = useState({});

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

  return (
    <div>
      <NavBar />
      <form className="profile-form">
        <h1>Account</h1>
        Username: {userData.username} <br />
        FirstName: {userData.fname} <br />
        LastName: {userData.lname} <br />
        Email: {userData.email} <br />
      </form>
    </div>
  );
}
