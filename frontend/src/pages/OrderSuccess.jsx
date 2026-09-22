import React from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

function OrderSuccess() {
  const { id } =
    useParams();

  return (
    <main className="home">
      <Navbar />

      <section className="orderSuccessPage">
        <motion.div
          className="successCard"
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.92
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            ease:
              [0.22, 1, 0.36, 1]
          }}
        >
          <motion.div
            className="successCircle"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              delay: 0.2
            }}
          >
            <motion.span
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.5
              }}
            >
              ✓
            </motion.span>
          </motion.div>

          <motion.p
            className="tag"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.45
            }}
          >
            ORDER CONFIRMED
          </motion.p>

          <h1>
            Thank You.
          </h1>

          <p className="successText">
            Your DEVSTORE order has
            been placed successfully.
          </p>

          <div className="successOrderId">
            <span>
              ORDER ID
            </span>

            <strong>
              {id}
            </strong>
          </div>

          <div className="successActions">
            <Link
              to="/orders"
              className="primary heroLink"
            >
              View My Orders →
            </Link>

            <Link
              to="/#products"
              className="secondary heroLink"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default OrderSuccess;
