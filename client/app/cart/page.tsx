"use client";
import { useContext } from "react";
import { CartContext } from "../AuthContext/CartContext";

export default function page() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-12">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">
          {cartItems.length > 0 ? (
            <>
              <p>Total: {getCartTotal()}</p>
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
