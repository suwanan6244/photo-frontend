import React, { Component } from "react";
import "./signin-signup_style.css";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);

    fetch("http://localhost:5000/signin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          MySwal.fire({
            html: <strong>successful</strong>,
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          //alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userId", data.userId);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./home";
        } else {
          MySwal.fire({
            html: <strong>{data.status}</strong>,
            icon: 'error'
          })
            //alert(data.status);
        }
      });
  }
  render() {
    return (


      <div className="signin-form-container">
        <div className="welcome">
        <h1>
          Welcome To Photo Stock
        </h1>
        <h2 className="mt-3">
           To keep connected with us please login with your personal info
        </h2>
        </div>
      <form className="signin-form" onSubmit={this.handleSubmit}>
        <div className="signin-form-content">
          <h3 className="signin-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>UserName</label>
            <input
              type="username" required
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>


          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" required
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <p className="forgot-password text-right mt-3">
             <a href="/resetpass">Forgot Password</a>
          </p>

          <div className="submit mt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <p className= "text-center mt-2">
            Have not an account yet? <a href="/signup">Sign Up</a>
          </p>
          
        </div>
      </form>
    </div>



    );
  }
}