import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  useWishlist
} from "../context/WishlistContext.jsx";

import {
  useCart
} from "../context/CartContext.jsx";

import {
  useToast
} from "../context/ToastContext.jsx";

function Wishlist() {
  const {
    wishlist,
    toggleWishlist
  } = useWishlist();

  const {
    addToCart
  } = useCart();

  const {
    showToast
  } = useToast();

  const handleCart = (product) => {
    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const removeItem = (product) => {
    toggleWishlist(product);

    showToast(
      "Removed from wishlist"
    );
  };

  return (
    <main className="home">
      <Navbar />

      <section className="wishlistPage">
        <motion.div
          className="wishlistHeader"
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
            SAVED ITEMS
          </p>

          <h1>
            Your Wishlist
          </h1>

          <p>
            {wishlist.length}
            {" "}
            {wishlist.length === 1
              ? "item saved"
              : "items saved"}
          </p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            className="emptyWishlist"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
          >
            <div className="emptyHeart">
              ♡
            </div>

            <h2>
              Nothing saved yet
            </h2>

            <p>
              Save products you like and
              they'll appear here.
            </p>

            <Link
              to="/#products"
              className="primary heroLink"
            >
              Explore Products →
            </Link>
          </motion.div>
        ) : (
          <div className="wishlistGrid">
            <AnimatePresence>
              {wishlist.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  className="wishlistCard"
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85
                  }}
                  whileHover={{
                    y: -7
                  }}
                >
                  <button
                    className="wishlistRemove"
                    onClick={() =>
                      removeItem(product)
                    }
                  >
                    ×
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="wishlistVisual"
                  >
                    <motion.span
                      whileHover={{
                        scale: 1.12
                      }}
                    >
                      {product.icon}
                    </motion.span>
                  </Link>

                  <div className="wishlistInfo">
                    <span>
                      {product.category}
                    </span>

                    <Link
                      to={`/product/${product.id}`}
                    >
                      <h3>
                        {product.name}
                      </h3>
                    </Link>

                    <div className="wishlistPrice">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                    <motion.button
                      whileTap={{
                        scale: 0.93
                      }}
                      onClick={() =>
                        handleCart(product)
                      }
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}

export default Wishlist;
