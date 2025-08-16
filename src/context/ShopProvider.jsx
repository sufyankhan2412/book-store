// src/context/ShopProvider.jsx
import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext({});

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteVersion, setFavoriteVersion] = useState(0); // Add version tracking

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

  const getInitialCart = () => {
    try {
      const savedCart = localStorage.getItem('writerShopCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error retrieving cart:", error);
      return [];
    }
  };

  // Initialize cart and favorites on mount
  useEffect(() => {
    // Load cart from localStorage
    setCart(getInitialCart());
    
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
        image: item.image || item.imagePath,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
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
      event.nativeEvent?.stopImmediatePropagation();
    }
    
    // Ensure the product has proper structure
    const productToAdd = {
      id: product._id || product.id,
      title: product.title,
      author: product.author || "Unknown Author",
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      image: product.image || product.imagePath,
      format: product.format || "Digital"
    };
    
    const existingItem = cart.find(item => String(item.id) === String(productToAdd.id));
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        String(item.id) === String(productToAdd.id) 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      );
    } else {
      newCart = [...cart, { ...productToAdd, quantity: 1 }];
    }
    
    // Update state and localStorage
    setCart(newCart);
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
    
    console.log('Added to cart:', productToAdd);
    console.log('New cart:', newCart);
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => String(item.id) !== String(productId));
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
      String(item.id) === String(productId) 
        ? { ...item, quantity: newQuantity } 
        : item
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
    const isFavorited = favorites.some(id => String(id) === stringProductId);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter(id => String(id) !== stringProductId);
    } else {
      newFavorites = [...favorites, stringProductId];
    }
    
    // Update state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('writerShopFavorites', JSON.stringify(newFavorites));
    
    // Update version to trigger re-renders
    setFavoriteVersion(prev => prev + 1);
    
    console.log('Updated favorites:', newFavorites);
    
    // Animate heart if adding to favorites
    if (event && !isFavorited) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 1s ease-out forwards;
      `;
      
      // Add keyframes if they don't exist
      if (!document.querySelector('#floating-heart-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-heart-styles';
        style.textContent = `
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(heart);
      setTimeout(() => document.body.removeChild(heart), 1000);
    }
  };

  // Check if product is favorited
  const isFavorited = (productId) => {
    return favorites.some(id => String(id) === String(productId));
  };

  // Context value
  const contextValue = {
    products,
    favorites,
    cart,
    isLoading,
    error,
    favoriteVersion, // Add version tracking
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
    isFavorited,
    setCart,
    setFavorites
  };
 
  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}