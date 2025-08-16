// src/context/useShop.js
import { useContext } from 'react';
import { ShopContext } from './ShopProvider';

export const useShop = () => {
  const context = useContext(ShopContext);
  
  if (!context) {
    console.warn('useShop must be used within a ShopProvider');
    // Return a fallback object instead of throwing error
    return {
      products: [],
      favorites: [],
      cart: [],
      isLoading: false,
      error: null,
      favoriteVersion: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      toggleFavorite: () => {},
      isFavorited: () => false,
      setCart: () => {},
      setFavorites: () => {}
    };
  }
  
  return context;
};