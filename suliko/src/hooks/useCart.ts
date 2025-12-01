import { useState, useCallback } from 'react';
import { MenuItem } from '../components/types';
import { CartItem } from '../utils/orderService';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item.id === item.id);
      
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prev, { item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return cartItems.reduce(
      (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
      0
    );
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };
}

