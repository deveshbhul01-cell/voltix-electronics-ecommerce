import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  getProducts
} from "../services/productService.js";

import {
  useCart
} from "../context/CartContext.jsx";

import {
  useWishlist
} from "../context/WishlistContext.jsx";

import {
  useToast
} from "../context/ToastContext.jsx";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09
    }
  }
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: "easeOut"
    }
  }
};

function Home() {
  const { addToCart } =
    useCart();

  const {
    toggleWishlist,
    isWishlisted
  } = useWishlist();

  const { showToast } =
    useToast();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load DEVSTORE products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        products.map(
          (product) =>
            product.category
        )
      )
    ],
    [products]
  );

  const filteredProducts =
    useMemo(() => {
      const keyword =
        search.toLowerCase();

      return products.filter(
        (product) => {
          const matchesSearch =
            product.name
              ?.toLowerCase()
              .includes(keyword) ||
            product.category
              ?.toLowerCase()
              .includes(keyword) ||
            product.description
              ?.toLowerCase()
              .includes(keyword);

          const matchesCategory =
            category === "All" ||
            product.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      search,
      category
    ]);

  const handleAddToCart = (
    product
  ) => {
    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const handleWishlist = (
    product
  ) => {
    const saved =
      isWishlisted(product.id);

    toggleWishlist(product);

    showToast(
      saved
        ? "Removed from wishlist"
        : `${product.name} saved`
    );
  };

  return (
    <main className="home">
      <Navbar />

      {/* HERO */}

      <section className="hero">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="tag"
            variants={fadeUp}
          >
            CURATED TECHNOLOGY
          </motion.p>

          <motion.h1
            variants={fadeUp}
          >
            Designed For
            <br />

            <span>
              Your Digital Life.
            </span>
          </motion.h1>

          <motion.p
            className="description"
            variants={fadeUp}
          >
            Discover carefully selected
            electronics, smart accessories
            and everyday technology with
            the clean DEVSTORE experience.
          </motion.p>

          <motion.div
            className="buttons"
            variants={fadeUp}
          >
            <motion.a
              href="#products"
              className="primary heroLink"
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
            >
              Shop Collection →
            </motion.a>

            <motion.a
              href="#about"
              className="secondary heroLink"
              whileHover={{
                scale: 1.04
              }}
              whileTap={{
                scale: 0.96
              }}
            >
              Discover DEVSTORE
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="heroCard"
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8
          }}
          whileHover={{
            scale: 1.025
          }}
        >
          <motion.div
            className="bolt"
            animate={{
              y: [
                0,
                -10,
                0
              ],

              rotate: [
                0,
                3,
                -3,
                0
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ◈
          </motion.div>

          <h2>
            DEV<span>STORE</span>
          </h2>

          <p>
            MINIMAL • MODERN • DIGITAL
          </p>

          <div className="heroMiniLine" />

          <span className="heroEdition">
            COLLECTION / 2026
          </span>
        </motion.div>
      </section>

      {/* FEATURES */}

      <motion.section
        className="features"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2
        }}
      >
        {[
          [
            "01",
            "Fast Delivery",
            "Quick and dependable shipping"
          ],

          [
            "02",
            "Secure Shopping",
            "Protected checkout experience"
          ],

          [
            "03",
            "Curated Tech",
            "Selected modern electronics"
          ],

          [
            "04",
            "Customer Support",
            "Support when you need it"
          ]
        ].map(
          ([
            number,
            title,
            text
          ]) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{
                y: -6
              }}
            >
              <span className="featureNumber">
                {number}
              </span>

              <strong>
                {title}
              </strong>

              <p>
                {text}
              </p>
            </motion.div>
          )
        )}
      </motion.section>

      {/* PRODUCTS */}

      <section
        className="productsSection"
        id="products"
      >
        <motion.div
          className="sectionHeading"
          initial={{
            opacity: 0,
            y: 35
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
        >
          <p className="tag">
            LIVE FROM MONGODB
          </p>

          <h2>
            Explore DEVSTORE
          </h2>

          <p>
            Products are now loaded
            directly from our database.
          </p>
        </motion.div>

        {/* SEARCH */}

        <motion.div
          className="storeControls"
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
        >
          <div className="searchBox">
            <span>⌕</span>

            <input
              value={search}
              type="text"
              placeholder="Search DEVSTORE..."
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}
          </div>

          {!loading && (
            <div className="categoryFilters">
              {categories.map(
                (item) => (
                  <motion.button
                    key={item}
                    className={
                      category === item
                        ? "filterActive"
                        : ""
                    }
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                      setCategory(item)
                    }
                  >
                    {item}
                  </motion.button>
                )
              )}
            </div>
          )}
        </motion.div>

        {/* LOADING */}

        {loading && (
          <div className="productGrid">
            {Array.from({
              length: 6
            }).map((_, index) => (
              <div
                className="productSkeleton"
                key={index}
              >
                <div className="skeletonImage" />

                <div className="skeletonContent">
                  <div className="skeletonLine small" />
                  <div className="skeletonLine title" />
                  <div className="skeletonLine" />
                  <div className="skeletonLine short" />

                  <div className="skeletonBottom">
                    <div className="skeletonPrice" />
                    <div className="skeletonButton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* API ERROR */}

        {!loading && error && (
          <motion.div
            className="storeError"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <div>!</div>

            <h3>
              Couldn't load products
            </h3>

            <p>
              Make sure the DEVSTORE
              backend is running on
              port 5000.
            </p>

            <button
              onClick={
                loadProducts
              }
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* PRODUCTS */}

        {!loading &&
          !error && (
            <>
              <div className="productResultBar">
                <span>
                  {
                    filteredProducts.length
                  }{" "}
                  {filteredProducts.length ===
                  1
                    ? "product"
                    : "products"}
                </span>

                {(search ||
                  category !==
                    "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory(
                        "All"
                      );
                    }}
                  >
                    Reset filters
                  </button>
                )}
              </div>

              <motion.div
                layout
                className="productGrid"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(
                    (product) => {
                      const saved =
                        isWishlisted(
                          product.id
                        );

                      return (
                        <motion.article
                          layout
                          className="productCard"
                          key={
                            product.id
                          }
                          initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.94
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                          }}
                          exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.9
                          }}
                          whileHover={{
                            y: -10
                          }}
                        >
                          {product.badge && (
                            <span className="homeProductBadge">
                              {
                                product.badge
                              }
                            </span>
                          )}

                          <motion.button
                            className={`wishlistButton ${
                              saved
                                ? "wishlistButtonActive"
                                : ""
                            }`}
                            whileTap={{
                              scale: 0.7
                            }}
                            onClick={() =>
                              handleWishlist(
                                product
                              )
                            }
                          >
                            {saved
                              ? "♥"
                              : "♡"}
                          </motion.button>

                          <Link
                            to={`/product/${product.id}`}
                            className="productVisualLink"
                          >
                            <div className="productImage">
                              {product.image ? (
                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.name
                                  }
                                  className="realProductImage"
                                />
                              ) : (
                                <motion.span
                                  whileHover={{
                                    scale: 1.13,
                                    rotate: 4
                                  }}
                                >
                                  {
                                    product.icon
                                  }
                                </motion.span>
                              )}
                            </div>
                          </Link>

                          <div className="productInfo">
                            <div className="productMeta">
                              <span className="category">
                                {
                                  product.category
                                }
                              </span>

                              <span className="miniRating">
                                ★{" "}
                                {
                                  product.rating
                                }
                              </span>
                            </div>

                            <Link
                              className="productNameLink"
                              to={`/product/${product.id}`}
                            >
                              <h3>
                                {
                                  product.name
                                }
                              </h3>
                            </Link>

                            <p>
                              {
                                product.description
                              }
                            </p>

                            <div className="stockStatus">
                              {product.stock >
                              0 ? (
                                <>
                                  <span className="stockDot" />
                                  In Stock ·{" "}
                                  {
                                    product.stock
                                  }{" "}
                                  available
                                </>
                              ) : (
                                <span className="outStock">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            <div className="cardPrices">
                              <strong>
                                ₹
                                {Number(
                                  product.price
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                              {product.oldPrice >
                                product.price && (
                                <del>
                                  ₹
                                  {Number(
                                    product.oldPrice
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </del>
                              )}
                            </div>

                            <div className="productCardActions">
                              <motion.button
                                className="addCartButton"
                                disabled={
                                  product.stock <=
                                  0
                                }
                                whileTap={
                                  product.stock >
                                  0
                                    ? {
                                        scale: 0.92
                                      }
                                    : {}
                                }
                                onClick={() =>
                                  handleAddToCart(
                                    product
                                  )
                                }
                              >
                                {product.stock >
                                0
                                  ? "Add to Cart"
                                  : "Unavailable"}
                              </motion.button>

                              <Link
                                className="viewProductButton"
                                to={`/product/${product.id}`}
                              >
                                View →
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      );
                    }
                  )}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length ===
                0 && (
                <div className="noProducts">
                  <div>⌕</div>

                  <h3>
                    No products found
                  </h3>

                  <p>
                    Try another search
                    or category.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory(
                        "All"
                      );
                    }}
                  >
                    View All Products
                  </button>
                </div>
              )}
            </>
          )}
      </section>

      {/* ABOUT */}

      <section
        className="aboutSection"
        id="about"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
        >
          <p className="tag">
            THE DEVSTORE PHILOSOPHY
          </p>

          <h2>
            Less Noise.
            <br />

            <span>
              Better Technology.
            </span>
          </h2>

          <p>
            DEVSTORE brings together
            thoughtfully selected
            technology with a clean,
            modern and enjoyable
            shopping experience.
          </p>
        </motion.div>

        <motion.div
          className="statsGrid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true
          }}
        >
          {[
            [
              "10K+",
              "Customers"
            ],
            [
              `${products.length}+`,
              "Products"
            ],
            [
              "24/7",
              "Support"
            ],
            [
              "100%",
              "Secure"
            ]
          ].map(
            ([number, label]) => (
              <motion.div
                className="statCard"
                key={label}
                variants={fadeUp}
                whileHover={{
                  y: -8
                }}
              >
                <strong>
                  {number}
                </strong>

                <span>
                  {label}
                </span>
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footerGrid">
          <div>
            <div className="logo">
              DEV<span>STORE</span>
            </div>

            <p>
              Modern technology.
              <br />
              Clean digital experience.
            </p>
          </div>

          <div>
            <strong>SHOP</strong>

            <a href="#products">
              Products
            </a>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <Link to="/cart">
              Cart
            </Link>
          </div>

          <div>
            <strong>
              ACCOUNT
            </strong>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </div>

          <div>
            <strong>
              DEVSTORE
            </strong>

            <a href="#about">
              About
            </a>

            <span>
              Support
            </span>
          </div>
        </div>

        <div className="footerBottom">
          <span>
            © 2026 DEVSTORE
          </span>

          <span>
            React • Express • MongoDB
          </span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
