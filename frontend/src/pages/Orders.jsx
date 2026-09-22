import React, {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  getMyOrders
} from "../services/orderService.js";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const data =
          await getMyOrders();

        setOrders(data);
      } catch {
        setError(
          "Unable to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="home">
      <Navbar />

      <section className="ordersPage">
        <motion.div
          className="ordersHeader"
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
            YOUR ACCOUNT
          </p>

          <h1>
            My Orders
          </h1>

          <p>
            Track and review your
            DEVSTORE purchases.
          </p>
        </motion.div>

        {loading && (
          <div className="ordersLoading">
            <div className="loaderRing" />

            <p>
              Loading orders...
            </p>
          </div>
        )}

        {!loading &&
          error && (
            <div className="storeError">
              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="emptyWishlist">
              <div className="emptyHeart">
                ◇
              </div>

              <h2>
                No orders yet
              </h2>

              <p>
                Your completed orders
                will appear here.
              </p>

              <Link
                to="/#products"
                className="primary heroLink"
              >
                Start Shopping →
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="ordersList">
              {orders.map(
                (order, index) => (
                  <motion.article
                    className="orderCard"
                    key={
                      order._id
                    }
                    initial={{
                      opacity: 0,
                      y: 25
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay:
                        index *
                        0.07
                    }}
                  >
                    <div className="orderCardHeader">
                      <div>
                        <small>
                          ORDER
                        </small>

                        <strong>
                          #
                          {order._id
                            .slice(
                              -8
                            )
                            .toUpperCase()}
                        </strong>
                      </div>

                      <div>
                        <small>
                          PLACED
                        </small>

                        <strong>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day:
                                "2-digit",
                              month:
                                "short",
                              year:
                                "numeric"
                            }
                          )}
                        </strong>
                      </div>

                      <div>
                        <small>
                          TOTAL
                        </small>

                        <strong>
                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>

                      <span
                        className={`orderStatus status${order.status}`}
                      >
                        {
                          order.status
                        }
                      </span>
                    </div>

                    <div className="orderItemsPreview">
                      {order.items.map(
                        (item) => (
                          <div
                            className="orderPreviewItem"
                            key={
                              item.product
                            }
                          >
                            <div>
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
                            </div>

                            <section>
                              <strong>
                                {
                                  item.name
                                }
                              </strong>

                              <span>
                                Qty{" "}
                                {
                                  item.quantity
                                }{" "}
                                • ₹
                                {item.price.toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </section>
                          </div>
                        )
                      )}
                    </div>

                    <div className="orderFooter">
                      <div>
                        <span>
                          Payment
                        </span>

                        <strong>
                          Cash on
                          Delivery
                        </strong>
                      </div>

                      <div>
                        <span>
                          Deliver to
                        </span>

                        <strong>
                          {
                            order
                              .shippingAddress
                              .city
                          }
                          ,{" "}
                          {
                            order
                              .shippingAddress
                              .state
                          }
                        </strong>
                      </div>
                    </div>
                  </motion.article>
                )
              )}
            </div>
          )}
      </section>
    </main>
  );
}

export default Orders;
