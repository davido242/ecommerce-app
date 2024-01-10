"use client";
import { useContext } from "react";
import { CartContext } from "../AuthContext/CartContext";

export default function page() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const serverUrl = "http://localhost:5001";

  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-12">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">
        <div className="flex flex-col gap-4">
          {cartItems.map((product) => (
            <div className="flex justify-between items-center" key={product.id}>
              <div className="flex gap-4">
                <img src={`${serverUrl}/images/${product.image}`} alt={product.name} className="rounded-md h-24" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{product.name}</h1>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  className="cart-btn"
                  onClick={() => {
                    addToCart(product)
                  }}
                >
                  +
                </button>
                <p>{product.quantity}</p>
                <button
                  className="cart-btn"
                  onClick={() => {
                    removeFromCart(product)
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
          {cartItems.length > 0 ? (
            <>
              <p className="text-center font-bold">Total: {getCartTotal()}</p>
              <div className="flex justify-between">
                <button onClick={clearCart} className="cart-btn">
                  Clear Cart
                </button>
                <button
                  onClick={() => {
                    alert("Order submitted!"), clearCart();
                  }}
                  className="cart-btn"
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center">Your Cart is Empty</p>              
            </>
          )}
        </div>
      </div>
    </div>
  );
}
