import React, { Component } from "react"
import "./resetpassstyle.css"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default class ResetPass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { email } = this.state
    console.log(email)

    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister")
        if(data.status === "error"){
          MySwal.fire({
            html: <strong>โปรดกรอกข้อมูล</strong>,
            icon: 'error'
          })
        }else{
        MySwal.fire({
          html: <strong>{data.status}</strong>,
          icon: 'error'
        })
      }
      });
  }
  render() {
    return (

      <div className="resetpass-form-container">
        
      <form className="resetpass-form" onSubmit={this.handleSubmit}>
        <div className="resetpass-form-content">
        <h3 className="resetpass-form-title">Password Reset</h3>

          <div className="form-group mt-3"></div>

        <div className="mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-2"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="submit mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
          <a href="/signin">Sign In</a>/<a href="/signup">Sign Up</a>

        </p>
        </div>
      </form>
    </div>

    )
  }
}