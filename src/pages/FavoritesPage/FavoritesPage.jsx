import { useMemo } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";
import {useShop} from "../../context/useShop";

export default function FavoritesPage() {
  const {
    favorites = [],
    products = [],
    toggleFavorite,
    addToCart,
    isLoading,
    favoriteVersion,
  } = useShop();

  console.log("FavoritesPage rendered with version:", favoriteVersion);
  console.log("Current favorites:", favorites);
  console.log("Products available:", products.length);

  const favoritedProducts = useMemo(() => {
    if (!Array.isArray(favorites) || favorites.length === 0) {
      return [];
    }

    let storedFavorites = [];
    try {
      const storedData = localStorage.getItem("writerShopFavorites");
      storedFavorites = storedData
        ? JSON.parse(storedData).map((id) => String(id))
        : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      storedFavorites = favorites.map((id) => String(id));
    }

    const filtered = products.filter(
      (product) =>
        product &&
        storedFavorites.some((fav) => String(fav) === String(product.id))
    );

    console.log(
      `Found ${filtered.length} favorited products using localStorage check`
    );
    return filtered;
  }, [favorites, products, favoriteVersion]);

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
                  />
                  <button
                    className="wishlist-button active"
                    onClick={(e) => toggleFavorite(product.id, e)}
                  >
                    <Heart size={18} fill="#e53e3e" />
                  </button>
                </div>

                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">
                    ${Number(product.price || 0).toFixed(2)}
                  </p>
                  <button
                    className="add-to-cart-button"
                    onClick={(e) => addToCart(product, e)}
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


