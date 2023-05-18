import React, { Component } from "react";
import "./navbarstyle.css";

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      cartCount: 0,
    };
  }

  updateCartCount = (count) => {
    this.setState({ cartCount: count });
  };
  
  handleClick = () =>{
    this.setState({clicked: !this.state.clicked})
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "/signin";
  };
  
    
  render() {
    return (
      <nav className="nav">
        <a href="/home">
        <svg id="logo-14" width="73" height="49" viewBox="0 0 73 49" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <path d="M46.8676 24C46.8676 36.4264 36.794 46.5 24.3676 46.5C11.9413 46.5 1.86765 36.4264 1.86765 24C1.86765 
        11.5736 11.9413 1.5 24.3676 1.5C36.794 1.5 46.8676 11.5736 46.8676 24Z" class="ccustom" fill="#68DBFF"></path> 
        <path d="M71.1324 24C71.1324 36.4264 61.1574 46.5 48.8529 46.5C36.5484 46.5 26.5735 36.4264 26.5735 24C26.5735 
        11.5736 36.5484 1.5 48.8529 1.5C61.1574 1.5 71.1324 11.5736 71.1324 24Z" class="ccompli1" fill="#FF7917"></path> 
        <path d="M36.6705 42.8416C42.8109 38.8239 46.8676 31.8858 46.8676 24C46.8676 16.1144 42.8109 9.17614 36.6705 5.15854C30.5904 
        9.17614 26.5735 16.1144 26.5735 24C26.5735 31.8858 30.5904 38.8239 36.6705 42.8416Z" class="ccompli2" fill="#5D2C02"></path> 
        </svg>
        <a href="/home">Photo Stock</a>
        </a>

        <div className="navbar">
          <ul className={this.state.clicked ? "navbar active" : "navbar"}>
            <li><a href="/home">Home</a></li>
            <li><a href="/uploadimage">Upload</a></li>
            <li><a href="/purchased">Purchased</a></li>
            <li><a href="/extract-watermark">ExtractWatermark</a></li>
            <li><a href="/profile">Account</a></li>
            <li>
          <a href="/cart">
            <i className="fas fa-shopping-cart"></i>
            {this.state.cartCount > 0 && <span className="badge">{this.state.cartCount}</span>}
          </a>
        </li>

            <li><button type="submit" onClick={this.logOut} className="btn btn-primary">Log out</button></li>
           
          </ul>

        </div>

        <div className="mobile" onClick={this.handleClick}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

          <i id ="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"} ></i>
        </div>

    </nav>

    );
  }
}
