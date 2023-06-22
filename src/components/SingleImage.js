import React, { useEffect, useState } from "react"
import NavBar from "./navbar"
import { useParams } from "react-router-dom"
import "./SingleImagestyle.css"

const SingleImage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [userId, setUserId] = useState("")
  const [purchasedProducts, setPurchasedProducts] = useState([])
  const [seller, setSeller] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      const productResponse = await fetch(`http://localhost:5000/allimage/${id}`)
      const productData = await productResponse.json()
      setProduct(productData)

      const sellerResponse = await fetch(`http://localhost:5000/user/${productData.sellerId}`)
      const sellerData = await sellerResponse.json()
      setSeller(sellerData)
    }
    fetchData()

    if (userId) {
      fetch(`http://localhost:5000/checkout/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          const purchased = result.checkouts
            .flatMap((checkout) => checkout.products)
            .map((product) => product.productId._id)
          setPurchasedProducts(purchased)
        })
    }
  }, [id, userId])


  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          productId: product._id,
          quantity,
        }),
      })
      const data = await response.json()
      alert(data.message)
    } catch (error) {
      console.log(error)
      alert("Error adding product to cart")
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.title}</div>
                <div style={{marginBottom: "5px" ,marginTop: "-20px",textDecoration: "underline", cursor: "pointer",  color: "#7a7a7a"}}>{seller.username}</div>
                <div className="product-description">{product.description}</div>
              </div>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>

                <button
                  type="button"
                  className={purchasedProducts.includes(product._id) ? "Purchased-round-black-btn" : "round-black-btn"}
                  onClick={() => {
                    if (!purchasedProducts.includes(product._id)) {
                      handleAddToCart(product._id)
                    }
                  }}
                  disabled={purchasedProducts.includes(product._id)}
                >
                  {purchasedProducts.includes(product._id) ? "Purchased" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleImage
