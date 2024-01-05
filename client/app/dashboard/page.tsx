"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { NameContext } from "../AuthContext/NameContext";
import CartBtn from "../components/CartBtn";

export default function page() {
  const { name } = useContext(NameContext);
  const [products, setProducts] = useState([]);

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
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">
          <h2 className="text-center font-bold py-4">Hey {name}</h2>
          <p className="text-center font-bold py-4">Available Products in Store</p>
          {error === "" ? (
            <div>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="flex justify-between p-2 border">
                      <div>{product.name}</div>
                      <div>
                        <img src={`${serverUrl}/images/${product.image}`} alt={product.image} height={40} width={40} />
                      </div>
                      <CartBtn title='Add to Cart' />
                    </div>
                  </li>
                ))}
              </ul>
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