import React, {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";
import api from "../services/api.js";

import {
  useToast
} from "../context/ToastContext.jsx";

function Admin() {
  const {
    showToast
  } = useToast();

  const [stats, setStats] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      icon: "📦",
      description: "",
      stock: "10",
      badge: "",
      rating: "4.5",
      reviews: "0"
    });

  const loadAdmin = async () => {
    try {
      setLoading(true);

      const [
        statsRes,
        ordersRes,
        productsRes
      ] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/orders"),
        api.get("/products")
      ]);

      setStats(
        statsRes.data.stats
      );

      setOrders(
        ordersRes.data.orders
      );

      setProducts(
        productsRes.data.products
      );
    } catch (error) {
      console.error(error);

      showToast(
        "Unable to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  const handleChange = (
    event
  ) => {
    setForm({
      ...form,

      [event.target.name]:
        event.target.value
    });
  };

  const addProduct = async (
    event
  ) => {
    event.preventDefault();

    try {
      await api.post(
        "/products",
        {
          ...form,

          price:
            Number(form.price),

          oldPrice:
            Number(
              form.oldPrice ||
                form.price
            ),

          stock:
            Number(form.stock),

          rating:
            Number(form.rating),

          reviews:
            Number(form.reviews),

          features: [
            "Premium DEVSTORE product",
            "Modern design",
            "Quality tested"
          ]
        }
      );

      showToast(
        "Product added successfully"
      );

      setForm({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        icon: "📦",
        description: "",
        stock: "10",
        badge: "",
        rating: "4.5",
        reviews: "0"
      });

      loadAdmin();
    } catch (error) {
      showToast(
        error.response?.data
          ?.message ||
          "Unable to add product"
      );
    }
  };

  const deleteProduct =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmed) return;

      try {
        await api.delete(
          `/products/${id}`
        );

        showToast(
          "Product deleted"
        );

        loadAdmin();
      } catch {
        showToast(
          "Unable to delete product"
        );
      }
    };

  const updateStatus =
    async (
      id,
      status
    ) => {
      try {
        await api.patch(
          `/admin/orders/${id}/status`,
          {
            status
          }
        );

        showToast(
          "Order status updated"
        );

        loadAdmin();
      } catch {
        showToast(
          "Unable to update order"
        );
      }
    };

  if (loading) {
    return (
      <main className="home">
        <Navbar />

        <div className="routeLoader">
          <div className="loaderRing" />

          <p>
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <Navbar />

      <section className="adminPage">
        <motion.div
          className="adminHeader"
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
            DEVSTORE CONTROL
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage products and
            customer orders.
          </p>
        </motion.div>

        <div className="adminStats">
          {[
            [
              "Revenue",
              `₹${Number(
                stats?.revenue || 0
              ).toLocaleString(
                "en-IN"
              )}`
            ],

            [
              "Orders",
              stats?.orders || 0
            ],

            [
              "Products",
              stats?.products || 0
            ],

            [
              "Users",
              stats?.users || 0
            ]
          ].map(
            ([label, value]) => (
              <motion.div
                className="adminStatCard"
                key={label}
                whileHover={{
                  y: -5
                }}
              >
                <span>
                  {label}
                </span>

                <strong>
                  {value}
                </strong>
              </motion.div>
            )
          )}
        </div>

        <div className="adminGrid">
          <section className="adminPanel">
            <div className="adminPanelTitle">
              <div>
                <p className="tag">
                  INVENTORY
                </p>

                <h2>
                  Add Product
                </h2>
              </div>
            </div>

            <form
              className="adminProductForm"
              onSubmit={
                addProduct
              }
            >
              <input
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={
                  handleChange
                }
                required
              />

              <input
                name="category"
                placeholder="Category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
                required
              />

              <input
                name="oldPrice"
                type="number"
                placeholder="Old price"
                value={
                  form.oldPrice
                }
                onChange={
                  handleChange
                }
              />

              <input
                name="icon"
                placeholder="Emoji"
                value={
                  form.icon
                }
                onChange={
                  handleChange
                }
              />

              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={
                  form.stock
                }
                onChange={
                  handleChange
                }
              />

              <input
                name="badge"
                placeholder="Badge e.g. NEW"
                value={
                  form.badge
                }
                onChange={
                  handleChange
                }
              />

              <textarea
                name="description"
                placeholder="Product description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                required
              />

              <button type="submit">
                Add Product →
              </button>
            </form>
          </section>

          <section className="adminPanel">
            <div className="adminPanelTitle">
              <div>
                <p className="tag">
                  DATABASE
                </p>

                <h2>
                  Products
                </h2>
              </div>

              <span>
                {products.length}
              </span>
            </div>

            <div className="adminProductList">
              {products.map(
                (product) => (
                  <div
                    className="adminProductRow"
                    key={
                      product._id
                    }
                  >
                    <div className="adminProductIcon">
                      {
                        product.icon
                      }
                    </div>

                    <div>
                      <strong>
                        {
                          product.name
                        }
                      </strong>

                      <span>
                        {
                          product.category
                        }{" "}
                        • ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <small>
                      {
                        product.stock
                      }{" "}
                      stock
                    </small>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        <section className="adminPanel adminOrdersPanel">
          <div className="adminPanelTitle">
            <div>
              <p className="tag">
                CUSTOMER ORDERS
              </p>

              <h2>
                Order Management
              </h2>
            </div>

            <span>
              {orders.length}
            </span>
          </div>

          <div className="adminOrdersTable">
            {orders.length === 0 ? (
              <p className="adminEmpty">
                No orders yet.
              </p>
            ) : (
              orders.map(
                (order) => (
                  <div
                    className="adminOrderRow"
                    key={
                      order._id
                    }
                  >
                    <div>
                      <small>
                        ORDER
                      </small>

                      <strong>
                        #
                        {order._id
                          .slice(-7)
                          .toUpperCase()}
                      </strong>
                    </div>

                    <div>
                      <small>
                        CUSTOMER
                      </small>

                      <strong>
                        {order.user
                          ?.name ||
                          "Customer"}
                      </strong>

                      <span>
                        {order.user
                          ?.email ||
                          ""}
                      </span>
                    </div>

                    <div>
                      <small>
                        TOTAL
                      </small>

                      <strong>
                        ₹
                        {Number(
                          order.total
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    <select
                      value={
                        order.status
                      }
                      onChange={(
                        event
                      ) =>
                        updateStatus(
                          order._id,
                          event.target
                            .value
                        )
                      }
                    >
                      <option>
                        Placed
                      </option>

                      <option>
                        Processing
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Delivered
                      </option>

                      <option>
                        Cancelled
                      </option>
                    </select>
                  </div>
                )
              )
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Admin;
