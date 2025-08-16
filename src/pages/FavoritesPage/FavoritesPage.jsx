import { useMemo, useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";
import { useShop } from "../../context/useShop";


export default function FavoritesPage() {
  const {
    favorites = [],
    products = [],
    toggleFavorite,
    addToCart,
    isLoading,
    favoriteVersion,
  } = useShop();

  const [localFavorites, setLocalFavorites] = useState([]);

  // Initialize favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('writerShopFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites).map(id => String(id));
        setLocalFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setLocalFavorites([]);
      }
    } else {
      setLocalFavorites([]);
    }
  }, []);

  // Sync with context favorites changes
  useEffect(() => {
    if (favorites && favorites.length >= 0) {
      const stringFavorites = favorites.map(id => String(id));
      setLocalFavorites(stringFavorites);
    }
  }, [favorites, favoriteVersion]);

  // Also listen for localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'writerShopFavorites') {
        try {
          const newFavorites = e.newValue ? JSON.parse(e.newValue).map(id => String(id)) : [];
          setLocalFavorites(newFavorites);
        } catch (error) {
          console.error("Error parsing favorites from storage event:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  console.log("FavoritesPage rendered with version:", favoriteVersion);
  console.log("Local favorites:", localFavorites);
  console.log("Context favorites:", favorites);
  console.log("Products available:", products.length);

  const favoritedProducts = useMemo(() => {
    if (!Array.isArray(localFavorites) || localFavorites.length === 0) {
      return [];
    }

    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    const filtered = products.filter(product => {
      if (!product || !product.id) return false;
      return localFavorites.some(favId => String(favId) === String(product.id));
    });

    console.log(`Found ${filtered.length} favorited products`);
    return filtered;
  }, [localFavorites, products, favoriteVersion]);

  const handleToggleFavorite = (productId, event) => {
    const stringProductId = String(productId);
    const isFavorited = localFavorites.some(id => String(id) === stringProductId);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = localFavorites.filter(id => String(id) !== stringProductId);
    } else {
      newFavorites = [...localFavorites, stringProductId];
    }
    
    // Update local state immediately
    setLocalFavorites(newFavorites);
    
    // Update localStorage immediately
    localStorage.setItem('writerShopFavorites', JSON.stringify(newFavorites));
    
    // Use context function if available
    if (toggleFavorite) {
      toggleFavorite(productId, event);
    }
  };

  const handleAddToCart = (product, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Create a properly formatted product object
    const productToAdd = {
      id: product._id || product.id,
      title: product.title,
      author: product.author || "Unknown Author",
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      image: product.image || product.imagePath,
      format: product.format || "Digital"
    };

    // Update cart in localStorage immediately
    const existingCart = JSON.parse(localStorage.getItem('writerShopCart') || '[]');
    const existingItem = existingCart.find(item => String(item.id) === String(productToAdd.id));
    
    let newCart;
    if (existingItem) {
      newCart = existingCart.map(item =>
        String(item.id) === String(productToAdd.id)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      newCart = [...existingCart, { ...productToAdd, quantity: 1 }];
    }
    
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));

    // Use context function if available
    if (addToCart) {
      addToCart(product, event);
    }

    // Show feedback
    alert(`Added "${product.title}" to cart!`);
  };

  if (isLoading) {
    return (
      <div className="favorites-page loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favoritedProducts.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-header">
            <h1>Your Favorites</h1>
            <p className="favorites-count">0 items</p>
          </div>
          <div className="empty-favorites">
            <Heart size={48} className="empty-heart-icon" />
            <h3>Your favorites list is empty</h3>
            <p>Tap the heart icon on products to add them here</p>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>Your Favorites</h1>
          <p className="favorites-count">{favoritedProducts.length} items</p>
        </div>

        <div className="favorites-grid">
          {favoritedProducts.map((product) => {
            const imageUrl =
              product.image &&
              product.image.startsWith("/") &&
              !product.image.startsWith("http")
                ? `http://localhost:5000${product.image}`
                : product.image || "/images/placeholder.jpg";

            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <button
                    className="wishlist-button active"
                    onClick={(e) => handleToggleFavorite(product.id, e)}
                    title="Remove from favorites"
                  >
                    <Heart size={18} fill="#e53e3e" />
                  </button>
                </div>

                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-author">{product.author || "Unknown Author"}</p>
                  <p className="product-price">
                    ${Number(product.price || 0).toFixed(2)}
                  </p>
                  <button
                    className="add-to-cart-button"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}