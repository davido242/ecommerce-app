import { createContext, useState, useEffect, ReactNode } from 'react';

// define types for items and context
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')) : [])


  // function to add to cart array
  const addToCart = (item) => {
    // checkcs if item is in the cart
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) => cartItem.id === item.id ?
          { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }


  // function to remove from cart array
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      // check if cart item is 1, remove from cart
      setCartItems(
        cartItems.filter((cartItem) => cartItem.id !== item.id),
      )
    }
    // else if more than one item is found, decrease by one
    else {
      setCartItems(
        cartItems.map((cartItem) => cartItem.id === item.id ?
          { cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  }

  // function to clear the cart array
  const clearCart = () => {
    setCartItems([]);
  }

  // function to get the cart total in the array
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // using useEffect to persist the data of our state and saving to localStorage
  useEffect(() => {
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // also get the items from localStorage with getItems method
  useEffect(() => {
    const cartItems = localStorage.getItem("CartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


// test Return within clearCart function and  increament by ++