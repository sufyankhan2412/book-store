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
  
  // Initialize local state for favorites and cart in case context isn't ready yet
  const [localFavorites, setLocalFavorites] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const [localGenres, setLocalGenres] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  
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

  // Initialize with context values or use local state if context isn't available
  useEffect(() => {
    if (shopContext) {
      // Check if each context property exists before using it
      if (shopContext.favorites !== undefined) setLocalFavorites(shopContext.favorites);
      if (shopContext.cart !== undefined) setLocalCart(shopContext.cart);
      if (shopContext.products !== undefined) setLocalProducts(shopContext.products);
      if (shopContext.categories !== undefined) setLocalCategories(shopContext.categories);
      if (shopContext.genres !== undefined) setLocalGenres(shopContext.genres);
      if (shopContext.isLoading !== undefined) setLocalLoading(shopContext.isLoading);
      if (shopContext.error !== undefined) setLocalError(shopContext.error);
    }
  }, [shopContext]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem('writerShopFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setLocalFavorites(parsedFavorites);
        // Only update context if it exists and has the setFavorites function
        if (shopContext && typeof shopContext.setFavorites === 'function') {
          shopContext.setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('writerShopCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setLocalCart(parsedCart);
        // Only update context if it exists and has the setCart function
        if (shopContext && typeof shopContext.setCart === 'function') {
          shopContext.setCart(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save favorites and cart whenever they change
  useEffect(() => {
    localStorage.setItem('writerShopFavorites', JSON.stringify(localFavorites));
    localStorage.setItem('writerShopCart', JSON.stringify(localCart));
  }, [localFavorites, localCart]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLocalLoading(true);
      try {
        // Update to use your backend URL (ensure CORS is enabled)
        const response = await fetch('http://localhost:5000/api/books');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setLocalProducts(data);
        
        // Update context if available
        if (shopContext && typeof shopContext.setProducts === 'function') {
          shopContext.setProducts(data);
        }
        
        // Generate categories and genres from products
        generateCategoriesAndGenres(data);
        
        setLocalLoading(false);
        // Update context if available
        if (shopContext && typeof shopContext.setIsLoading === 'function') {
          shopContext.setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setLocalError(err.message);
        if (shopContext && typeof shopContext.setError === 'function') {
          shopContext.setError(err.message);
        }
        setLocalLoading(false);
        if (shopContext && typeof shopContext.setIsLoading === 'function') {
          shopContext.setIsLoading(false);
        }
        
        // Fallback to sample data if API fails
        useSampleData();
      }
    };
    
    const fetchUserData = async () => {
      try {
        // Use a simple userId for now (in production you'd use authentication)
        const userId = localStorage.getItem('userId') || 'user-' + Date.now();
        localStorage.setItem('userId', userId);
        
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Update cart and favorites from user data
        const newCart = userData.cart.map(item => ({
          ...item.bookId,
          quantity: item.quantity
        }));
        const newFavorites = userData.favorites.map(book => book._id);
        
        setLocalCart(newCart);
        setLocalFavorites(newFavorites);
        
        // Update context if available
        if (shopContext) {
          if (typeof shopContext.setCart === 'function') {
            shopContext.setCart(newCart);
          }
          if (typeof shopContext.setFavorites === 'function') {
            shopContext.setFavorites(newFavorites);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        // Continue with local data if API fails
      }
    };
    
    fetchProducts();
    fetchUserData();
    
    // Set page as loaded after small delay for entrance animations
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

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
    
    // Update context if available
    if (shopContext) {
      if (typeof shopContext.setCategories === 'function') {
        shopContext.setCategories(formattedCategories);
      }
      if (typeof shopContext.setGenres === 'function') {
        shopContext.setGenres(formattedGenres);
      }
    }
  };
  
  // Use sample data as fallback if API fails
  const useSampleData = () => {
    // Sample product data
    const sampleProducts = [
      {
        id: 1,
        title: "Professional Writer's Notebook",
        price: 24.99,
        category: "stationery",
        genre: "uncategorized",
        isBestseller: true,
        image: "/api/placeholder/300/300",
        description: "Premium notebook designed for writers with acid-free paper and lay-flat binding."
      },
      {
        id: 2,
        title: "The Art of Storytelling",
        price: 34.95,
        category: "books",
        genre: "business",
        isBestseller: false,
        image: "/api/placeholder/300/300",
        description: "Comprehensive guide to crafting compelling narratives for writers of all levels."
      },
      // Add more sample products as needed
      {
        id: 9,
        title: "Gourmet Cooking for Writers",
        price: 45.99,
        category: "books",
        genre: "cookbook",
        isBestseller: true,
        image: "/api/placeholder/300/300",
        description: "The perfect cookbook for writers looking to cook delicious meals while staying creative."
      },
      {
        id: 10,
        title: "The Last Chapter",
        price: 29.99,
        category: "books",
        genre: "drama",
        isBestseller: false,
        image: "/api/placeholder/300/300",
        description: "A compelling drama about a novelist facing their own mortality and final work."
      }
    ];
    
    setLocalProducts(sampleProducts);
    if (shopContext && typeof shopContext.setProducts === 'function') {
      shopContext.setProducts(sampleProducts);
    }
    generateCategoriesAndGenres(sampleProducts);
  };

  // Toggle favorite function with error handling
  const toggleFavorite = async (productId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Ensure productId is a string for consistent comparison
    const stringProductId = String(productId);
    
    // Check if the product is already in favorites
    const isFavorited = localFavorites.includes(stringProductId) ||
                        localFavorites.some(id => String(id) === stringProductId);
    
    // Create new favorites array
    const newFavorites = isFavorited
      ? localFavorites.filter(id => String(id) !== stringProductId)
      : [...localFavorites, stringProductId];
    
    // Update local state
    setLocalFavorites(newFavorites);
    
    // Update localStorage first to ensure data persistence
    localStorage.setItem('writerShopFavorites', JSON.stringify(newFavorites));
    
    // Update context if available - make sure this is happening
    if (shopContext && typeof shopContext.setFavorites === 'function') {
      shopContext.setFavorites(newFavorites);
      console.log('Updated favorites in context:', newFavorites);
    } else {
      console.warn('Shop context or setFavorites function is not available');
    }
    
    // Add animation when adding to favorites
    if (event && !isFavorited) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      const x = event.clientX;
      const y = event.clientY;
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      document.body.appendChild(heart);
      
      setTimeout(() => {
        document.body.removeChild(heart);
      }, 1000);
    }
    
    // Update in database
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.warn('No userId found in localStorage');
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId: productId }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Server response:', data);
      
    } catch (err) {
      console.error("Failed to update favorites:", err);
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

  // Filter products based on current selections - using localProducts
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
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Bestseller filter
    if (showBestsellersOnly && !product.isBestseller) {
      return false;
    }
    
    // Search query
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'bestsellers':
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      case 'featured':
      default:
        return a.id - b.id; // Default sort by ID (featured)
    }
  });

  // Add to cart function with animation (now directly navigating to cart page)
  const addToCart = async (product, event) => {
    // Create animation element at click position
    if (event) {
      const x = event.clientX;
      const y = event.clientY;
      
      // Create the flying element
      const flyingItem = document.createElement('div');
      flyingItem.className = 'flying-item';
      flyingItem.style.backgroundImage = `url(${product.image})`;
      flyingItem.style.left = `${x}px`;
      flyingItem.style.top = `${y}px`;
      
      // Get cart button position
      const cartBtn = document.querySelector('.cart-button');
      const cartRect = cartBtn.getBoundingClientRect();
      const cartX = cartRect.left + cartRect.width / 2;
      const cartY = cartRect.top + cartRect.height / 2;
      
      // Set final position (cart)
      flyingItem.style.setProperty('--end-x', `${cartX - x}px`);
      flyingItem.style.setProperty('--end-y', `${cartY - y}px`);
      
      document.body.appendChild(flyingItem);
      
      // Remove the element after animation completes
      setTimeout(() => {
        document.body.removeChild(flyingItem);
      }, 1000);
    }
    
    // Update cart state locally for immediate feedback
    const existingItem = localCart.find(item => item.id === product.id);
    let newQuantity = 1;
    let newCart;
    
    if (existingItem) {
      newQuantity = existingItem.quantity + 1;
      newCart = localCart.map(item => 
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      );
    } else {
      newCart = [...localCart, { ...product, quantity: newQuantity }];
    }
    
    setLocalCart(newCart);
    
    // Update context if available
    if (shopContext && typeof shopContext.setCart === 'function') {
      shopContext.setCart(newCart);
    }
    
    // Save to localStorage
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
    
    // Update in database
    try {
      const userId = localStorage.getItem('userId');
      await fetch(`http://localhost:5000/api/users/${userId}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          bookId: product.id, 
          quantity: newQuantity 
        }),
      });
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };
  
  // Loading state
  if (localLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  
  // Error state
  if (localError && localProducts.length === 0) {
    return (
      <div className="error-container">
        <h2>Failed to load products</h2>
        <p>{localError}</p>
        <button onClick={useSampleData} className="retry-button">
          Use Sample Data
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
            <h1 className="shop-title">Writer's Shop</h1>
            
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
                  {localCart.reduce((total, item) => total + item.quantity, 0)}
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
                {sortedProducts.map((product, index) => (
                  <div key={product.index} className="product-card" style={{"--animation-order": index}}>
                    <div className="product-image-container">
                      <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
                      {product.isBestseller && (
                        <div className="bestseller-tag">
                          BESTSELLER
                        </div>
                      )}
                      <button 
                        className={`wishlist-button ${localFavorites.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => toggleFavorite(product.id, e)}
                      >
                        <Heart size={18} fill={localFavorites.includes(product.id) ? "#e53e3e" : "none"} />
                      </button>
                    </div>
                    
                    <div className="product-details">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-price">${product.price.toFixed(2)}</p>
                      <p className="product-description">{product.description}</p>
                      
                      <button 
  className="add-to-cart-button list-view-button"
  onClick={(e) => addToCart(product, e)}
>
  Add to Cart
</button>

                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Products list */}
            {viewMode === 'list' && sortedProducts.length > 0 && (
              <div className="products-list">
                {sortedProducts.map((product, index) => (
                  <div key={product.id} className="product-list-item" style={{"--animation-order": index}}>
                    <div className="product-list-image">
                      <img src={product.image} alt={product.title} className="product-image" />
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
                          className={`wishlist-button ${localFavorites.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(product.id, e)}
                        >
                          <Heart size={18} fill={localFavorites.includes(product.id) ? "#e53e3e" : "none"} />
                        </button>
                      </div>
                      
                      <p className="product-price">${product.price.toFixed(2)}</p>
                      <p className="product-description">{product.description}</p>
                      
                      <button 
                        className="add-to-cart-button list-view-button"
                        onClick={(e) => {
                          addToCart(product, e);
                          // Wait for animation to complete before navigating
                          setTimeout(() => {
                            navigate('/Cart');
                          }, 1000);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}