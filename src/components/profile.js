import React, { Component } from "react";
import NavBar from "./navbar";
import "./profile.css";



export default class UserDetails extends Component {
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
        ข้อมูลส่วนตัว
        </h1>   
        ชื่อผู้ใช้: {this.state.userData.username}  <br /> 
        ชื่อ: {this.state.userData.fname}  <br />   
        นามสกุล: {this.state.userData.lname}    <br />
        Email : {this.state.userData.email}    <br />
      </form>
      
      </div>

    );
  }
}