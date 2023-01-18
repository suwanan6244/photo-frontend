import React, { Component } from "react";

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
        Name<h1>{this.state.userData.username}</h1>
        Email <h1>{this.state.userData.email}</h1><br>
        </br>
        <button onClick={this.logOut} className="btn btn-primary">Log out</button>
      </div>
    );
  }
}