import React, { Component } from "react";
import NavBar from "./navbar";
import "./profile.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalAmount: 0
    };
  }

  componentDidMount() {
    const storedUserId = window.localStorage.getItem("userId");
    const userId = storedUserId ? storedUserId : this.props.userId;

    fetch(`http://localhost:5000/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "cartItems");
        const totalAmount = data.cartItems.reduce((total, item) => {
          return total + item.productId.price * item.quantity;
        }, 0);
        this.setState({ cartItems: data.cartItems, totalAmount });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (itemId) => {
    const storedUserId = window.localStorage.getItem("userId");
    const userId = storedUserId ? storedUserId : this.props.userId;

    fetch(`http://localhost:5000/cart/${userId}/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Update the cart items list after deleting the item
        const updatedCartItems = this.state.cartItems.filter(
          (item) => item._id !== itemId
        );
        const totalAmount = updatedCartItems.reduce((total, item) => {
          return total + item.productId.price * item.quantity;
        }, 0);
        this.setState({ cartItems: updatedCartItems, totalAmount });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { cartItems, totalAmount } = this.state;
    return (
      <div>
        <NavBar cartCount={cartItems.length} />
        <form className="profile-form">
          <h1>ข้อมูลในตะกร้าสินค้า</h1>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th> 
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.productId.title}</td>
                  <td>{item.productId.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>Total amount: {totalAmount}</div>
          <button className="btn btn-primary">ชำระเงิน</button>
        </form>
      </div>
    );
  }
}
