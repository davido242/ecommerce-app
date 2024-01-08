import { createContext, useState, useEffect, ReactNode } from 'react';

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

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')!) : [])

  const addToCart = (item: CartItem) => {
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

  const removeFromCart = (item: CartItem) => {
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
          { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  }

  const clearCart = () => {
    setCartItems([]);
  }
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  useEffect(() => {
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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