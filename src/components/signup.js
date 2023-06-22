import React, { Component } from "react"
import "./signin-signup_style.css"


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { username, fname, lname, email, password } = this.state
    console.log(username, fname, lname, email, password)
    fetch("http://localhost:5000/signup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        fname,
        email,
        lname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister")
        if (data.status === "ok") {
          MySwal.fire({
            html: <strong>successful</strong>,
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          window.location.href = "./signin"

          //alert("login successful")
         
        } else {
          MySwal.fire({
            html: <strong>{data.status}</strong>,
            icon: 'error'
          })
            //alert(data.status)
        }
        /*alert("Signup Successful")
        window.location.href = "./login"*/
      })
  }
  render() {
    return (
      <div className="signup-form-container">
        <div className="welcome-signup">
        <h1>
        Hello, Friend
        </h1>
        <h2 className="mt-3">
        Enter your personal details and start journey with us        </h2>
        </div>
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <div className="signup-form-content">
          <h3 className="signup-form-title">Sign Up</h3>
          
          <div className="text-center">
          Already registered? <a href="/signin">Sign In</a>
          </div>

          <div className="form-group mt-3">
            <label>UserName</label>
            <input
              type="text" required
              className="form-control mt-1"
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}            />
          </div>

          <div className="form-group mt-3">
            <label>First name</label>
            <input
              type="text" required
              className="form-control mt-1"
              placeholder="First name"
              onChange={(e) => this.setState({ fname: e.target.value })}            />
          </div>
          

          <div className="form-group mt-3">
            <label>Last name</label>
            <input
              type="text" required
              className="form-control mt-1"
              placeholder="Last name"
              onChange={(e) => this.setState({ lname: e.target.value })}            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email" required
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label><small> (ระบุอย่างน้อย 8 ตัว)</small>
            <input
              type="password" required
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}            />
          </div>

          <div className="submit mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
    )
  }
}