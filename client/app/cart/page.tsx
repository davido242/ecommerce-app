import { useContext } from 'react';
import { CartContext } from "./AuthContext/CartContext";

export default function page() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  return (
    <div>
      
    </div>
  )
}
