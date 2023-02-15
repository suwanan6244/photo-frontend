import React, { Component } from "react";
import NavBar from "./navbar";
import "./profile.css";



export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
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
        this.setState({ userData: data.data });
        if(data.data === 'token expired'){
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "/signin";        }
      });
  }

  render() {
    return (
      <div>
      <NavBar />
      <form className="profile-form">
        <h1>
        ข้อมูลในตะกร้าสินค้า 
        </h1>  
        <br /> 
        <button className="btn btn-primary">ชำระเงิน</button>
      </form>
      
      </div>

    );
  }
}