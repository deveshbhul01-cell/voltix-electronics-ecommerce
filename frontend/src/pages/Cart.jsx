import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 5000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <main className="home">
      <Navbar />

      <section className="cartPage">
        <div className="cartTitle">
          <div>
            <p className="tag">YOUR SHOPPING BAG</p>
            <h1>Shopping Cart</h1>
          </div>

          {cart.length > 0 && (
            <button className="clearCart" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="emptyCart">
            <div className="emptyCartIcon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some DevStore products and they'll appear here.</p>

            <Link to="/" className="primary heroLink">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="cartLayout">
            <div className="cartItems">
              {cart.map((item) => (
                <article className="cartItem" key={item.id}>
                  <div className="cartIcon">{item.icon}</div>

                  <div className="cartDetails">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>

                    <button
                      className="removeButton"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="quantityControl">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      −
                    </button>

                    <strong>{item.quantity}</strong>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <div className="cartPrice">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </article>
              ))}

              <Link to="/" className="continueShopping">
                ← Continue Shopping
              </Link>
            </div>

            <aside className="orderSummary">
              <h2>Order Summary</h2>

              <div className="summaryRow">
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div className="summaryRow">
                <span>Delivery</span>
                <strong>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </strong>
              </div>

              <div className="summaryDivider"></div>

              <div className="summaryTotal">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              <button
                className="checkoutButton"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>

              <p className="secureText">
                🔒 Secure checkout • Protected payment
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
