import React, { useState } from "react";
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./Cart.css";
import { useShop } from "../../context/useShop";

const Cart = () => {
  const { cart, setCart } = useShop();
  const [paymentType, setPaymentType] = useState("Credit Card");
  const [cardInfo, setCardInfo] = useState({
    name: "",
    expiration: "",
    number: "",
    cvv: "",
    paypalEmail: "",
  });

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('writerShopCart', JSON.stringify(newCart));
  };

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

  const calculateTotal = () => {
    // Ensure prices are numbers and quantities are valid
    const subtotal = cart.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
    
    const shipping = 2.99;
    const total = subtotal + shipping;
    
    return { 
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  };

  const { subtotal, shipping, total } = calculateTotal();

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (paymentType === "Credit Card" || paymentType === "Debit Card") {
      const { name, expiration, number, cvv } = cardInfo;

      if (!name || !expiration || !number || !cvv) {
        alert("Please fill in all card details.");
        return;
      }

      if (number.length < 16 || cvv.length < 3) {
        alert("Invalid card number or CVV.");
        return;
      }

      alert("✅ Payment successful! Thank you for your purchase.");
    } else if (paymentType === "PayPal") {
      if (!cardInfo.paypalEmail || !cardInfo.paypalEmail.includes("@")) {
        alert("Please enter a valid PayPal email.");
        return;
      }

      alert("✅ PayPal checkout successful!");
    }

    try {
      await api.post('/api/orders', {
        paymentMethod: paymentType,
        cardInfo
      });
      
      setCart([]);
      alert("✅ Payment successful! Order created.");
    } catch (err) {
      alert("❌ Payment failed: " + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <section className="h-100 h-custom">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="h5">Shopping Bag</th>
                    <th>Format</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p>Your cart is empty</p>
                        <Link to="/" className="continue-shopping">
                          Continue Shopping
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => {
                      const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                      const itemQuantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
                      const itemTotal = itemPrice * itemQuantity;

                      // Use absolute URL if path starts with '/' and is a relative path
                      const imageUrl = item.image && item.image.startsWith('/') && !item.image.startsWith('http')
                        ? `http://localhost:5000${item.image}`
                        : item.image;

                      return (
                        <tr key={item.id}>
                          <th>
                            <div className="book-info">
                              <img src={imageUrl} alt="Book" />
                              <div className="book-details">
                                <p>{item.title}</p>
                                <p className="author">{item.author || "Unknown Author"}</p>
                              </div>
                            </div>
                          </th>
                          <td>{item.format || "Digital"}</td>
                          <td>
                            <div className="quantity-controls">
                              <button onClick={() => updateQuantity(item.id, itemQuantity - 1)}>−</button>
                              <input type="number" value={itemQuantity} readOnly />
                              <button onClick={() => updateQuantity(item.id, itemQuantity + 1)}>+</button>
                            </div>
                          </td>
                          <td>${itemTotal.toFixed(2)}</td>
                          <td>
                            <button 
                              className="remove-item"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {cart.length > 0 && (
              <div className="payment-card">
                <div className="row">
                  <div className="col payment-methods">
                    <form>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="Credit Card"
                          checked={paymentType === "Credit Card"}
                          onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <img src="/assets/credit-card.jpeg" alt="Credit Card" className="payment-icon" />
                        Credit Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="Debit Card"
                          checked={paymentType === "Debit Card"}
                          onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <img src="/assets/debit-card.jpeg" alt="Debit Card" className="payment-icon" />
                        Debit Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="PayPal"
                          checked={paymentType === "PayPal"}
                          onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <img src="/assets/paypal.jpeg" alt="PayPal" className="payment-icon" />
                        PayPal
                      </label>
                    </form>
                  </div>

                  {(paymentType === "Credit Card" || paymentType === "Debit Card") && (
                    <div className="col card-details">
                      <input
                        type="text"
                        placeholder="Name on Card"
                        name="name"
                        value={cardInfo.name}
                        onChange={handleCardChange}
                      />
                      <input
                        type="text"
                        placeholder="Expiration (MM/YY)"
                        name="expiration"
                        value={cardInfo.expiration}
                        onChange={handleCardChange}
                      />
                      <input
                        type="text"
                        placeholder="Card Number"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleCardChange}
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                      />
                    </div>
                  )}

                  {paymentType === "PayPal" && (
                    <div className="col paypal-info">
                      <input
                        type="email"
                        placeholder="PayPal Email"
                        name="paypalEmail"
                        value={cardInfo.paypalEmail}
                        onChange={handleCardChange}
                      />
                    </div>
                  )}

                  <div className="col summary">
                    <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                    <p>Shipping: <span>${shipping.toFixed(2)}</span></p>
                    <hr />
                    <p>Total: <strong>${total.toFixed(2)}</strong></p>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      <span>Checkout</span>
                      <span>${total.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;