import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Filter, X, ChevronDown, ChevronUp, Heart, Grid, List } from 'lucide-react';
import './Shop.css';
import { Link } from 'react-router-dom';
import { useShop } from "../../context/useShop";


export default function Shop() {
  const navigate = useNavigate();
  
  // Get the context values with proper error handling
  const shopContext = useShop();
  
  // Use context values directly with fallbacks
  const {
    products = [],
    favorites = [],
    cart = [],
    isLoading = true,
    error = null,
    addToCart: contextAddToCart,
    toggleFavorite: contextToggleFavorite
  } = shopContext || {};
  
  // Local state for favorites and cart to ensure immediate UI updates
  const [localFavorites, setLocalFavorites] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const [localGenres, setLocalGenres] = useState([]);
  
  // Component-specific state
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Initialize local state from localStorage
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('writerShopFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites).map(id => String(id));
        setLocalFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setLocalFavorites([]);
      }
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('writerShopCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setLocalCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setLocalCart([]);
      }
    }

    // Set page as loaded after small delay for entrance animations
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

  // Sync with context values when they change
  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
      generateCategoriesAndGenres(products);
    }
  }, [products]);

  useEffect(() => {
    if (favorites && favorites.length >= 0) {
      setLocalFavorites(favorites.map(id => String(id)));
    }
  }, [favorites]);

  useEffect(() => {
    if (cart && cart.length >= 0) {
      setLocalCart(cart);
    }
  }, [cart]);

  // Generate categories and genres from product data
  const generateCategoriesAndGenres = (productData) => {
    // For categories - ensure all categories are included even if count is 0
    const allCategories = ['All Categories', 'Uncategorized', 'Business', 'Entertainment', 'Motivation', 'My Books'];
    const categoryCounts = {
      'All Categories': productData.length,
      'Uncategorized': productData.filter(p => p.genre === "uncategorized").length,
      'Business': productData.filter(p => p.genre === "business").length,
      'Entertainment': productData.filter(p => p.genre === "entertainment").length,
      'Motivation': productData.filter(p => p.genre === "motivation").length,
      'My Books': productData.filter(p => p.category === "my books").length
    };
    
    const formattedCategories = allCategories.map(name => ({
      name,
      count: categoryCounts[name] || 0
    }));
    
    // For genres - ensure all genres are included even if count is 0
    const allGenres = ['All Genres', 'Cookbook', 'Drama', 'Mystery', 'Romance'];
    const genreCounts = {
      'All Genres': productData.length,
      'Cookbook': productData.filter(p => p.genre === "cookbook").length,
      'Drama': productData.filter(p => p.genre === "drama").length,
      'Mystery': productData.filter(p => p.genre === "mystery").length,
      'Romance': productData.filter(p => p.genre === "romance").length
    };
    
    const formattedGenres = allGenres.map(name => ({
      name,
      count: genreCounts[name] || 0
    }));
    
    setLocalCategories(formattedCategories);
    setLocalGenres(formattedGenres);
  };

  // Toggle favorite function with localStorage persistence
  const toggleFavorite = (productId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const stringProductId = String(productId);
    const isFavorited = localFavorites.some(id => String(id) === stringProductId);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = localFavorites.filter(id => String(id) !== stringProductId);
    } else {
      newFavorites = [...localFavorites, stringProductId];
    }
    
    // Update local state immediately for UI responsiveness
    setLocalFavorites(newFavorites);
    
    // Update localStorage immediately
    localStorage.setItem('writerShopFavorites', JSON.stringify(newFavorites));
    
    // Use context function if available
    if (contextToggleFavorite) {
      contextToggleFavorite(productId, event);
    }
    
    // Add animation when adding to favorites
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
      setTimeout(() => {
        if (document.body.contains(heart)) {
          document.body.removeChild(heart);
        }
      }, 1000);
    }
  };

  // Create the empty state component
  const EmptyStateView = ({ message, resetFilters }) => {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <img src="/api/placeholder/200/200" alt="No items found" className="empty-state-image" />
          <h3 className="empty-state-title">No items found</h3>
          <p className="empty-state-message">{message || "No products match your current filters"}</p>
          <button 
            className="clear-filters"
            onClick={resetFilters}
          >
            Clear all filters
          </button>
        </div>
      </div>
    );
  };

  // Filter products based on current selections
  const filteredProducts = localProducts.filter(product => {
    // Category filter (excluding "All Categories")
    if (selectedCategory !== 'All Categories') {
      if (selectedCategory === 'My Books' && product.category !== 'my books') {
        return false;
      } else if (selectedCategory !== 'My Books' && product.genre !== selectedCategory.toLowerCase()) {
        return false;
      }
    }
    
    // Genre filter (excluding "All Genres")
    if (selectedGenre !== 'All Genres' && product.genre !== selectedGenre.toLowerCase()) {
      return false;
    }
    
    // Price range filter
    const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
      return false;
    }
    
    // Bestseller filter
    if (showBestsellersOnly && !product.isBestseller) {
      return false;
    }
    
    // Search query
    if (searchQuery && 
        !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !(product.author && product.author.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
        return priceA - priceB;
      case 'price-high':
        const priceHighA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
        const priceHighB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
        return priceHighB - priceHighA;
      case 'bestsellers':
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      case 'featured':
      default:
        return (a.id || 0) - (b.id || 0); // Default sort by ID (featured)
    }
  });

  // Add to cart function with immediate localStorage update
  const addToCart = (product, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Create animation element at click position
    if (event) {
      const x = event.clientX;
      const y = event.clientY;
      
      // Create the flying element
      const flyingItem = document.createElement('div');
      flyingItem.className = 'flying-item';
      flyingItem.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: #007bff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: flyToCart 1s ease-out forwards;
      `;
      
      // Get cart button position
      const cartBtn = document.querySelector('.cart-button');
      if (cartBtn) {
        const cartRect = cartBtn.getBoundingClientRect();
        const cartX = cartRect.left + cartRect.width / 2;
        const cartY = cartRect.top + cartRect.height / 2;
        
        // Add keyframes if they don't exist
        if (!document.querySelector('#flying-item-styles')) {
          const style = document.createElement('style');
          style.id = 'flying-item-styles';
          style.textContent = `
            @keyframes flyToCart {
              0% { transform: translate(0, 0) scale(1); opacity: 1; }
              100% { transform: translate(${cartX - x}px, ${cartY - y}px) scale(0.2); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      document.body.appendChild(flyingItem);
      
      // Remove the element after animation completes
      setTimeout(() => {
        if (document.body.contains(flyingItem)) {
          document.body.removeChild(flyingItem);
        }
      }, 1000);
    }
    
    // Create properly formatted product object
    const productToAdd = {
      id: product._id || product.id,
      title: product.title,
      author: product.author || "Unknown Author",
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      image: product.image || product.imagePath,
      format: product.format || "Digital"
    };
    
    // Update cart state locally for immediate feedback
    const existingItem = localCart.find(item => String(item.id) === String(productToAdd.id));
    let newCart;
    
    if (existingItem) {
      newCart = localCart.map(item => 
        String(item.id) === String(productToAdd.id) 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      );
    } else {
      newCart = [...localCart, { ...productToAdd, quantity: 1 }];
    }
    
    // Update local state immediately
    setLocalCart(newCart);
    
    // Save to localStorage immediately
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
    
    // Use context function if available
    if (contextAddToCart) {
      contextAddToCart(product, event);
    }
    
    console.log('Added to cart:', productToAdd);
  };
  
  // Loading state
  if (isLoading && localProducts.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  
  // Error state
  if (error && localProducts.length === 0) {
    return (
      <div className="error-container">
        <h2>Failed to load products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className={`shop-container ${isPageLoaded ? 'page-loaded' : ''}`}>
      {/* Header */}
      <header className="shop-header">
        <div className="container">
          <div className="header-content">
            <h1 className="shop-title"> Readify</h1>
            
            {/* Search bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for products..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <Search className="search-icon" size={20} />
            </div>
            
            {/* Favorites link */}
            <Link to="/favorites" className="favorites-link">
              <Heart 
                size={20} 
                fill={localFavorites.length > 0 ? "#e53e3e" : "none"} 
                stroke={localFavorites.length > 0 ? "#e53e3e" : "currentColor"}
              />
              {localFavorites.length > 0 && (
                <span className="favorites-count">
                  {localFavorites.length}
                </span>
              )}
            </Link>
            
            {/* Cart button */}
            <button 
              className="cart-button"
              onClick={() => navigate('/Cart')}
            >
              <ShoppingCart size={20} />
              {localCart.length > 0 && (
                <span className="cart-count">
                  {localCart.reduce((total, item) => total + (item.quantity || 0), 0)}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobile search */}
          <div className="mobile-search">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <Search className="search-icon" size={20} />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="shop-main container">
        <div className="shop-layout">
          {/* Mobile filter button */}
          <div className="mobile-filter-button">
            <button 
              className="filter-toggle"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter size={18} className="filter-icon" />
              Filters & Categories
              {showMobileFilters ? <ChevronUp size={18} className="chevron-icon" /> : <ChevronDown size={18} className="chevron-icon" />}
            </button>
          </div>
          
          {/* Sidebar filters */}
          <aside className={`shop-sidebar ${showMobileFilters ? 'show-mobile' : ''}`}>
            <div className="filter-section">
              <h2 className="section-title">Categories</h2>
              
              <ul className="category-list">
                {localCategories.map(category => (
                  <li key={category.name}>
                    <button
                      className={`category-button ${
                        selectedCategory === category.name ? 'active' : ''
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <span className="category-count">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="filter-divider"></div>
              
              <h2 className="section-title">Genres</h2>
              
              <ul className="category-list">
                {localGenres.map(genre => (
                  <li key={genre.name}>
                    <button
                      className={`category-button ${
                        selectedGenre === genre.name ? 'active' : ''
                      }`}
                      onClick={() => setSelectedGenre(genre.name)}
                    >
                      <span>{genre.name}</span>
                      <span className="category-count">
                        {genre.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="filter-divider"></div>
              
              <div className="price-filter">
                <h3 className="filter-subtitle">Price Range</h3>
                <div className="price-range-labels">
                  <span className="price-label">${priceRange[0]}</span>
                  <span className="price-label">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  className="price-slider"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
              
              <div className="filter-divider"></div>
              
              <div className="bestseller-filter">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={showBestsellersOnly}
                    onChange={() => setShowBestsellersOnly(!showBestsellersOnly)}
                  />
                  <span className="checkbox-text">Bestsellers Only</span>
                </label>
              </div>
            </div>
          </aside>
          
          {/* Product listing */}
          <div className="shop-content">
            {/* Filter bar */}
            <div className="filter-bar">
              <div className="sort-container">
                <span className="sort-label">Sort by:</span>
                <select
                  className="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bestsellers">Bestsellers</option>
                </select>
              </div>
              
              <div className="view-options">
                <span className="product-count">
                  Showing {sortedProducts.length} products
                </span>
                <div className="view-buttons">
                  <button
                    className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Empty state - No results */}
            {sortedProducts.length === 0 && (
              <EmptyStateView 
                message={
                  selectedCategory !== 'All Categories' || selectedGenre !== 'All Genres' || searchQuery
                    ? "No products match your current filters"
                    : "No products are available at the moment"
                }
                resetFilters={() => {
                  setSelectedCategory('All Categories');
                  setSelectedGenre('All Genres');
                  setPriceRange([0, 500]);
                  setShowBestsellersOnly(false);
                  setSearchQuery('');
                }}
              />
            )}
            
            {/* Products grid */}
            {viewMode === 'grid' && sortedProducts.length > 0 && (
              <div className="products-grid">
                {sortedProducts.map((product, index) => {
                  const imageUrl = product.image && product.image.startsWith('/') && !product.image.startsWith('http')
                    ? `http://localhost:5000${product.image}`
                    : product.image || '/images/placeholder.jpg';

                  const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
                  const isProductFavorited = localFavorites.some(id => String(id) === String(product.id));

                  return (
                    <div key={product.id} className="product-card" style={{"--animation-order": index}}>
                      <div className="product-image-container">
                        <img 
                          src={imageUrl} 
                          alt={product.title} 
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                        {product.isBestseller && (
                          <div className="bestseller-tag">
                            BESTSELLER
                          </div>
                        )}
                        <button 
                          className={`wishlist-button ${isProductFavorited ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(product.id, e)}
                        >
                          <Heart size={18} fill={isProductFavorited ? "#e53e3e" : "none"} />
                        </button>
                      </div>
                      
                      <div className="product-details">
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-author">{product.author || "Unknown Author"}</p>
                        <p className="product-price">${productPrice.toFixed(2)}</p>
                        <p className="product-description">{product.description || ""}</p>
                        
                        <button 
                          className="add-to-cart-button"
                          onClick={(e) => addToCart(product, e)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Products list */}
            {viewMode === 'list' && sortedProducts.length > 0 && (
              <div className="products-list">
                {sortedProducts.map((product, index) => {
                  const imageUrl = product.image && product.image.startsWith('/') && !product.image.startsWith('http')
                    ? `http://localhost:5000${product.image}`
                    : product.image || '/images/placeholder.jpg';

                  const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
                  const isProductFavorited = localFavorites.some(id => String(id) === String(product.id));

                  return (
                    <div key={product.id} className="product-list-item" style={{"--animation-order": index}}>
                      <div className="product-list-image">
                        <img 
                          src={imageUrl} 
                          alt={product.title} 
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                        {product.isBestseller && (
                          <div className="bestseller-tag">
                            BESTSELLER
                          </div>
                        )}
                      </div>
                      
                      <div className="product-list-details">
                        <div className="product-list-header">
                          <h3 className="product-title">{product.title}</h3>
                          <button 
                            className={`wishlist-button ${isProductFavorited ? 'active' : ''}`}
                            onClick={(e) => toggleFavorite(product.id, e)}
                          >
                            <Heart size={18} fill={isProductFavorited ? "#e53e3e" : "none"} />
                          </button>
                        </div>
                        
                        <p className="product-author">{product.author || "Unknown Author"}</p>
                        <p className="product-price">${productPrice.toFixed(2)}</p>
                        <p className="product-description">{product.description || ""}</p>
                        
                        <button 
                          className="add-to-cart-button list-view-button"
                          onClick={(e) => addToCart(product, e)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}