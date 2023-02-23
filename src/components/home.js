import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");

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

  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
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
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 container mx-auto gap-10 my-12">
        {items.map((product) => (
          <div
            className="p-2 bg-white rounded border border-black-400"
            key={product._id}
          >
            <img
              className="w-full h-64 object-cover"
              src={product.image}
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
      </div>
    </div>
  );
};

export default Home;