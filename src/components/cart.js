import React, { Component } from "react"
import NavBar from "./navbar"
import StripeCheckout from 'react-stripe-checkout'
import "./homestyle.css"


export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartItems: [],
      totalAmount: 0
    }
  }

  componentDidMount() {
    const storedUserId = window.localStorage.getItem("userId")
    const userId = storedUserId ? storedUserId : this.props.userId
    fetch(`http://localhost:5000/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "cartItems")
        const totalAmount = data.cartItems.reduce((total, item) => {
          return total + item.productId.price * item.quantity
        }, 0)
        this.setState({ cartItems: data.cartItems, totalAmount })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleDelete = (itemId) => {
    const storedUserId = window.localStorage.getItem("userId")
    const buyerId = storedUserId ? storedUserId : this.props.userId
    fetch(`http://localhost:5000/cart/${buyerId}/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // Update the cart items list after deleting the item
        const updatedCartItems = this.state.cartItems.filter(
          (item) => item._id !== itemId
        )
        const totalAmount = updatedCartItems.reduce((total, item) => {
          return total + item.productId.price * item.quantity
        }, 0)
        this.setState({ cartItems: updatedCartItems, totalAmount })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleToken = async (token) => {
    const storedUserId = window.localStorage.getItem("userId")
    const buyerId = storedUserId ? storedUserId : this.props.userId
    const { cartItems, totalAmount } = this.state

    const response = await fetch(`http://localhost:5000/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId,
        cartItems,
        totalAmount,
        stripeTokenId: token.id,
      }),
    })

    if (response.ok) {
      this.setState({ cartItems: [], totalAmount: 0 })
      window.location.href = "./purchased"

      await fetch(`http://localhost:5000/cart/${buyerId}`, {
        method: "DELETE",
      })
    } else {
      const error = await response.json()
      alert(`Checkout failed: ${error.msg}`)
    }
  }



  render() {
    const { cartItems, totalAmount } = this.state
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <h1 style={{paddingLeft: "60px", fontWeight: "bold" ,fontSize: "20px"}}>Shopping Cart</h1>
          <table className="table table-bordered mt-4 table-small">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${item.productId.image}`}
                      alt={item.productId.title}
                      style={{ width: "100px" }} />
                  </td>
                  <td>{item.productId.title}</td>
                  <td>${item.productId.price}</td>
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
              <tr>
                <td colSpan="2" align="right">
                  Total:
                </td>
                <td>{totalAmount}</td>
                <td>
                  {cartItems.length > 0 ? (
                    <StripeCheckout
                      stripeKey="pk_test_51MfJMuCa6p7Qb3lSI4El6ex4VRWPv4W5hkSeD6Fa5amibfS1fM828fBbtEEHT1xbBru3OcCZo7HvDjovlG1b4ybC003WbPNoG0"
                      token={this.handleToken}
                      name="Shopping Cart"
                      amount={totalAmount * 100}
                      currency="USD"
                      billingAddress
                      shippingAddress
                    >
                      <button className="btn btn-primary">
                        Checkout
                      </button>
                    </StripeCheckout>
                  ) : (
                    <button className="btn disabled" disabled>
                      Checkout
                    </button>
                  )}


                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
