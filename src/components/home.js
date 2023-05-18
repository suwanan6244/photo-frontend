import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [purchasedProducts, setPurchasedProducts] = useState([]);


  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    fetch("http://localhost:5000/allimage")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });

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
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./signin";
        }
      });
    if (userId) {
      fetch(`http://localhost:5000/checkout/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          const purchased = result.checkouts
            .flatMap((checkout) => checkout.products)
            .map((product) => product.productId._id);
          setPurchasedProducts(purchased);
        });
    }
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          productId: productId,
          quantity: 1, // Default quantity is 1
        }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Error adding product to cart");
    }
  };
  return (
    <div>
      <NavBar />
      <div className="container mx-auto my-4">
        <div className="d-flex justify-content-center">
          <input
            className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search for images..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fas fa-search" style={{ marginLeft: "-25px", marginTop: "10px" }}></i>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
        {items
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <div
              className="p-2 bg-white rounded border border-black-400"
              key={product._id}
            >
              <img
                className="w-full h-64 object-cover"
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
              />
              <h1 className="font-semibold text-black-800  my-2 leading-8">
                <Link to={`/image/${product._id}`}>
                  {product.title}<br />${product.price}
                </Link>
              </h1>

              <Link to={`/image/${product._id}`}>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2">
                  View
                </button>
              </Link>

  <button
  type="button"
  className={purchasedProducts.includes(product._id) ? "bg-gray-500 text-white  font-bold py-2 px-3 rounded mr-2 mb-2" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"}
  onClick={() => {
    if (!purchasedProducts.includes(product._id)) {
      handleAddToCart(product._id);
    }
  }}
  disabled={purchasedProducts.includes(product._id)}
>
  {purchasedProducts.includes(product._id) ? "Purchased" : "Add to Cart"}
</button>


            </div>
          ))}
        {items.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && searchTerm !== "" &&
          <div className="justify-content-center" >
            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "20px", color: "#a7a7a7" }}>
              Result Not Found...
            </p>      </div>
        }
      </div>
    </div>
  );
};

export default Home;