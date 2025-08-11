// src/context/ShopProvider.jsx
import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext({});

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Get initial state from localStorage
  const getInitialFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem('writerShopFavorites');
      return savedFavorites ? JSON.parse(savedFavorites).map(id => String(id)) : [];
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      return [];
    }
  };

  // Initialize cart and favorites on mount
  useEffect(() => {
    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem('writerShopCart');
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart([]);
    }

    // Load favorites from localStorage
    setFavorites(getInitialFavorites());
    
    // Fetch products from API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/books');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform data for consistency
      const transformedData = data.map(item => ({
        ...item,
        id: item._id || item.id,
        image: item.image || item.imagePath
      }));

      setProducts(transformedData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add to cart function
  const addToCart = (product, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    
    // Ensure the image property is properly set
    const productWithImage = {
      ...product,
      image: product.image || product.imagePath
    };
    
    const existingItem = cart.find(item => item.id === product.id);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...productWithImage, quantity: 1 }];
    }
    
    // Update state and localStorage
    setCart(newCart);
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
  };

  // Update quantity function
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(newCart);
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
  };

  // Toggle favorite function
  const toggleFavorite = (productId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const stringProductId = String(productId);
    const isFavorited = favorites.includes(stringProductId);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter(id => id !== stringProductId);
    } else {
      newFavorites = [...favorites, stringProductId];
    }
    
    // Update state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('writerShopFavorites', JSON.stringify(newFavorites));
    
    // Animate heart if adding to favorites
    if (event && !isFavorited) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.left = `${event.clientX}px`;
      heart.style.top = `${event.clientY}px`;
      document.body.appendChild(heart);
      
      setTimeout(() => document.body.removeChild(heart), 1000);
    }
  };

  // Check if product is favorited
  const isFavorited = (productId) => {
    return favorites.includes(String(productId));
  };

  // Context value
  const contextValue = {
    products,
    favorites,
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
    isFavorited,
    setCart
  };
 
  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}