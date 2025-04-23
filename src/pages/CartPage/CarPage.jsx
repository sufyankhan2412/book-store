import React, { useState } from "react";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      format: "Digital",
      quantity: 2,
      price: 9.99,
      image: "https://i.imgur.com/2DsA49b.webp",
    },
    {
      id: 2,
      title: "Homo Deus: A Brief History of Tomorrow",
      author: "Yuval Noah Harari",
      format: "Paperback",
      quantity: 1,
      price: 13.5,
      image: "https://i.imgur.com/Oj1iQUX.webp",
    },
  ]);

  const [paymentType, setPaymentType] = useState("Credit Card");
  const [cardInfo, setCardInfo] = useState({
    name: "",
    expiration: "",
    number: "",
    cvv: "",
    paypalEmail: "",
  });

  const handleQuantityChange = (index, delta) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 2.99;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = calculateTotal();

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
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

    setCartItems([]);
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
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <th>
                        <div className="book-info">
                          <img src={item.image} alt="Book" />
                          <div className="book-details">
                            <p>{item.title}</p>
                            <p className="author">{item.author}</p>
                          </div>
                        </div>
                      </th>
                      <td>{item.format}</td>
                      <td>
                        <div className="quantity-controls">
                          <button onClick={() => handleQuantityChange(index, -1)}>−</button>
                          <input type="number" value={item.quantity} readOnly />
                          <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;