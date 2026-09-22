import React, {
  useMemo,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  useCart
} from "../context/CartContext.jsx";

import {
  useAuth
} from "../context/AuthContext.jsx";

import {
  useToast
} from "../context/ToastContext.jsx";

import {
  placeOrder
} from "../services/orderService.js";

function Checkout() {
  const navigate =
    useNavigate();

  const {
    cart,
    clearCart
  } = useCart();

  const {
    user
  } = useAuth();

  const {
    showToast
  } = useToast();

  const [form, setForm] =
    useState({
      fullName:
        user?.name || "",

      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India"
    });

  const [error, setError] =
    useState("");

  const [placing, setPlacing] =
    useState(false);

  const subtotal =
    useMemo(() => {
      return cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
            item.quantity,
        0
      );
    }, [cart]);

  const shipping =
    subtotal >= 5000 ||
    subtotal === 0
      ? 0
      : 99;

  const total =
    subtotal + shipping;

  const handleChange =
    (event) => {
      setForm({
        ...form,

        [event.target.name]:
          event.target.value
      });
    };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");

      if (cart.length === 0) {
        setError(
          "Your cart is empty."
        );

        return;
      }

      const {
        fullName,
        phone,
        address,
        city,
        state,
        postalCode
      } = form;

      if (
        !fullName ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !postalCode
      ) {
        setError(
          "Please complete all shipping fields."
        );

        return;
      }

      try {
        setPlacing(true);

        const payload = {
          items: cart.map(
            (item) => ({
              productId:
                item._id ||
                item.id,

              quantity:
                item.quantity
            })
          ),

          shippingAddress:
            form
        };

        const data =
          await placeOrder(
            payload
          );

        clearCart();

        showToast(
          "Order placed successfully"
        );

        navigate(
          `/order-success/${data.order._id}`,
          {
            replace: true
          }
        );
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to place order."
        );
      } finally {
        setPlacing(false);
      }
    };

  if (cart.length === 0) {
    return (
      <main className="home">
        <Navbar />

        <section className="checkoutPage">
          <div className="emptyCart">
            <div className="emptyCartIcon">
              ◇
            </div>

            <h2>
              Your bag is empty
            </h2>

            <p>
              Add some products before
              checking out.
            </p>

            <Link
              to="/#products"
              className="primary heroLink"
            >
              Continue Shopping →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="home">
      <Navbar />

      <section className="checkoutPage realCheckout">
        <motion.div
          className="checkoutHeader"
          initial={{
            opacity: 0,
            y: 25
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >
          <p className="tag">
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Shipping details and order
            confirmation.
          </p>
        </motion.div>

        <form
          className="checkoutGrid"
          onSubmit={
            handleSubmit
          }
        >
          <motion.div
            className="checkoutFormCard"
            initial={{
              opacity: 0,
              x: -30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
          >
            <div className="checkoutSectionTitle">
              <span>01</span>

              <div>
                <h2>
                  Shipping Details
                </h2>

                <p>
                  Where should we
                  deliver your order?
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                className="authError"
                initial={{
                  opacity: 0,
                  y: -5
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
              >
                {error}
              </motion.div>
            )}

            <div className="checkoutFields">
              <div className="fullField">
                <label>
                  Full Name
                </label>

                <input
                  name="fullName"
                  value={
                    form.fullName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label>
                  Phone
                </label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={
                    handleChange
                  }
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label>
                  Postal Code
                </label>

                <input
                  name="postalCode"
                  value={
                    form.postalCode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Postal code"
                />
              </div>

              <div className="fullField">
                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="House, street, area..."
                />
              </div>

              <div>
                <label>
                  City
                </label>

                <input
                  name="city"
                  value={form.city}
                  onChange={
                    handleChange
                  }
                  placeholder="City"
                />
              </div>

              <div>
                <label>
                  State
                </label>

                <input
                  name="state"
                  value={form.state}
                  onChange={
                    handleChange
                  }
                  placeholder="State"
                />
              </div>

              <div className="fullField">
                <label>
                  Country
                </label>

                <input
                  name="country"
                  value={
                    form.country
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>

            <div className="checkoutPayment">
              <div className="checkoutSectionTitle">
                <span>02</span>

                <div>
                  <h2>
                    Payment
                  </h2>

                  <p>
                    Payment option for
                    this project.
                  </p>
                </div>
              </div>

              <div className="codOption">
                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <p>
                    Pay when your order
                    is delivered.
                  </p>
                </div>

                <span>✓</span>
              </div>
            </div>
          </motion.div>

          <motion.aside
            className="checkoutSummaryCard"
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
          >
            <p className="tag">
              YOUR ORDER
            </p>

            <h2>
              Order Summary
            </h2>

            <div className="checkoutProducts">
              {cart.map(
                (item) => (
                  <div
                    className="checkoutProduct"
                    key={
                      item._id ||
                      item.id
                    }
                  >
                    <div className="checkoutProductVisual">
                      {item.image ? (
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                        />
                      ) : (
                        item.icon
                      )}

                      <span>
                        {
                          item.quantity
                        }
                      </span>
                    </div>

                    <div>
                      <strong>
                        {
                          item.name
                        }
                      </strong>

                      <small>
                        {
                          item.category
                        }
                      </small>
                    </div>

                    <b>
                      ₹
                      {(
                        Number(
                          item.price
                        ) *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </b>
                  </div>
                )
              )}
            </div>

            <div className="checkoutPriceRows">
              <div>
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Shipping
                </span>

                <strong>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </strong>
              </div>

              <div className="checkoutGrandTotal">
                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>

            <motion.button
              type="submit"
              className="placeOrderButton"
              disabled={placing}
              whileHover={
                placing
                  ? {}
                  : {
                      scale:
                        1.02
                    }
              }
              whileTap={
                placing
                  ? {}
                  : {
                      scale:
                        0.97
                    }
              }
            >
              {placing
                ? "Placing Order..."
                : `Place Order • ₹${total.toLocaleString(
                    "en-IN"
                  )}`}
            </motion.button>

            <p className="secureCheckoutText">
              🔒 Secure DEVSTORE checkout
            </p>
          </motion.aside>
        </form>
      </section>
    </main>
  );
}

export default Checkout;
