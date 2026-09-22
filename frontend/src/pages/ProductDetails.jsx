import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  getProductById
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

function ProductDetails() {
  const { id } =
    useParams();

  const { addToCart } =
    useCart();

  const {
    toggleWishlist,
    isWishlisted
  } = useWishlist();

  const { showToast } =
    useToast();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadProduct =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getProductById(
              id
            );

          setProduct(data);
        } catch (error) {
          console.error(error);

          setError(
            "Product could not be found."
          );
        } finally {
          setLoading(false);
        }
      };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="home">
        <Navbar />

        <div className="productDetailLoader">
          <div className="loaderRing" />

          <p>
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (
    error ||
    !product
  ) {
    return (
      <main className="home">
        <Navbar />

        <div className="productNotFound">
          <h1>
            Product not found.
          </h1>

          <p>
            This product may have
            been removed.
          </p>

          <Link
            to="/#products"
            className="primary heroLink"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const saved =
    isWishlisted(product.id);

  const handleCart = () => {
    if (product.stock <= 0)
      return;

    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const handleWishlist = () => {
    toggleWishlist(product);

    showToast(
      saved
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  return (
    <main className="home">
      <Navbar />

      <section className="detailsPage">
        <Link
          className="backProducts"
          to="/#products"
        >
          ← Back to products
        </Link>

        <div className="detailsGrid">
          <motion.div
            className="detailsVisual"
            initial={{
              opacity: 0,
              x: -50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6
            }}
          >
            {product.badge && (
              <span className="productBadge">
                {product.badge}
              </span>
            )}

            {product.image ? (
              <motion.img
                className="detailsRealImage"
                src={product.image}
                alt={product.name}
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
              />
            ) : (
              <motion.div
                className="detailEmoji"
                animate={{
                  y: [
                    0,
                    -12,
                    0
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat:
                    Infinity,
                  ease:
                    "easeInOut"
                }}
              >
                {product.icon}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="detailsInfo"
            initial={{
              opacity: 0,
              x: 50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6
            }}
          >
            <p className="tag">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <div className="rating">
              ★ {product.rating}

              <span>
                ({product.reviews} reviews)
              </span>
            </div>

            <p className="detailDescription">
              {product.description}
            </p>

            <div className="detailStock">
              {product.stock > 0 ? (
                <>
                  <span className="stockDot" />

                  In Stock —{" "}
                  {product.stock} available
                </>
              ) : (
                <span className="outStock">
                  Currently unavailable
                </span>
              )}
            </div>

            <div className="detailPrice">
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

            <div className="detailActions">
              <motion.button
                className="detailCartButton"
                disabled={
                  product.stock <= 0
                }
                whileHover={
                  product.stock > 0
                    ? {
                        scale: 1.03
                      }
                    : {}
                }
                whileTap={
                  product.stock > 0
                    ? {
                        scale: 0.94
                      }
                    : {}
                }
                onClick={
                  handleCart
                }
              >
                {product.stock > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </motion.button>

              <motion.button
                className={`wishlistBig ${
                  saved
                    ? "wishlistActive"
                    : ""
                }`}
                whileTap={{
                  scale: 0.8
                }}
                onClick={
                  handleWishlist
                }
              >
                {saved
                  ? "♥"
                  : "♡"}
              </motion.button>
            </div>

            <div className="productFeatures">
              <h3>
                Highlights
              </h3>

              {product.features?.map(
                (feature) => (
                  <motion.div
                    className="featureLine"
                    key={feature}
                    initial={{
                      opacity: 0,
                      x: 12
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                  >
                    <span>✓</span>

                    {feature}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
