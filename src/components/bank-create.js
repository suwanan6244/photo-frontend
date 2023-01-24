import React, { Component } from "react";
import NavBar from "./navbar";


export default class BankCreate extends Component {
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
          window.location.href = "/login";        }
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return (
      <div>
      <NavBar />
      <div>
        บันทึกข้อมูลบัญชีธนาคาร/พร้อมเพล์ <br>
        </br>
       
        <button onClick={this.logOut} className="btn btn-primary">Log out</button>
      </div>
      </div>

    );
  }
}