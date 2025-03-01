import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    fetch('http://localhost:5001/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partId: item._id }),
    }).catch(err => console.error('Cart add error:', err));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item._id !== itemId));
    fetch(`http://localhost:5001/api/cart/remove/${itemId}`, { method: 'DELETE' })
      .catch(err => console.error('Cart remove error:', err));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};