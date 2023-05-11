import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  }, []);

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
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 mb-2"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
           {items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).length === 0 && searchTerm !== "" &&
    <p>No resources found.</p>
  }
      </div>
    </div>
  );
};

export default Home;