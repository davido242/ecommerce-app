"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { NameContext } from "../AuthContext/NameContext";
import { CartContext } from "../AuthContext/CartContext";

export default function Product() {
  const { name } = useContext(NameContext);
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);

  const [error, setError] = useState("");
  const serverUrl = "http://localhost:5001";

  useEffect(() => {
    fetch(`${serverUrl}/product`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      });
  }, []);

  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-24">
      <div className="container mx-auto px-8">
        <div className="bg-slate-100 p-4 rounded mx-auto">
          <h2 className="text-center font-bold py-4">Hey {name}</h2>
          <p className="text-center font-bold py-4">Available Products in Store</p>
          {error === "" ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <div key={product.id} className="p-5 mb-10 border border-amber-300 rounded-md">
                  <div>
                    <img src={`${serverUrl}/images/${product.image}`} alt={product.image} className="rounded h-48" />
                  </div>
                  <div>
                    <h2 className="text-lg uppercase font-bold py-3">{product.name}</h2>
                    <p className="text-sm" id="description">{("An apple mobile which is nothing like app Up for a Grab").slice(0, 30)}....</p>
                    <p className="text-sm font-bold text-[#7f6c6c]">₦ {product.price}</p>
                  </div>
                  <button className="cart-btn" onClick={() => addToCart(product)}>
                    Add Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "red" }} className="text-red-500 text-center">
              {"**"}
              {error}
              {"**"}
            </div>
          )}
        </div>
        <div className="text-center mt-9 flex justify-evenly">
          <Link href="/products" className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4">
            Add More Products
          </Link>
        </div>
      </div>
    </div>
  );
}
