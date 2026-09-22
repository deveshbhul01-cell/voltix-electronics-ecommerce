import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import {
  useCart
} from "../context/CartContext.jsx";

import {
  useWishlist
} from "../context/WishlistContext.jsx";

import {
  useAuth
} from "../context/AuthContext.jsx";

import {
  useToast
} from "../context/ToastContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const {
    cartCount
  } = useCart();

  const {
    wishlist
  } = useWishlist();

  const {
    user,
    logout
  } = useAuth();

  const {
    showToast
  } = useToast();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();

    setMobileOpen(false);

    showToast(
      "Logged out successfully"
    );

    navigate("/");
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="mainNavbar"
        initial={{
          y: -80,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut"
        }}
      >
        {/* LOGO */}

        <motion.div
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.96
          }}
        >
          <Link
            to="/"
            className="logo"
          >
            DEV<span>STORE</span>
          </Link>
        </motion.div>

        {/* DESKTOP NAV */}

        <div className="navLinks desktopNav">
          <Link to="/">
            Home
          </Link>

          <a href="/#products">
            Shop
          </a>

          <a href="/#about">
            About
          </a>

          <motion.div
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.92
            }}
          >
            <Link
              to="/wishlist"
              className="wishlistNav"
            >
              ♡

              {wishlist.length > 0 && (
                <span>
                  {wishlist.length}
                </span>
              )}
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.06
            }}
            whileTap={{
              scale: 0.93
            }}
          >
            <Link
              to="/cart"
              className="cartButton"
            >
              Bag

              {cartCount > 0 && (
                <span className="cartCount">
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>

          {user ? (
            <div className="userNav">
              <div className="userAvatar">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="userNavText">
                <small>
                  Welcome
                </small>

                <strong>
                  {user.name}
                </strong>
              </div>

              <Link
                to="/orders"
                className="ordersNavLink"
              >
                Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="adminNavLink"
                >
                  Admin
                </Link>
              )}

              <motion.button
                className="logoutButton"
                whileTap={{
                  scale: 0.92
                }}
                onClick={
                  handleLogout
                }
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <Link
              to="/login"
              className="loginButton"
            >
              Account
            </Link>
          )}
        </div>

        {/* MOBILE CONTROLS */}

        <div className="mobileNavControls">
          <Link
            to="/cart"
            className="mobileBag"
          >
            Bag

            {cartCount > 0 && (
              <span>
                {cartCount}
              </span>
            )}
          </Link>

          <motion.button
            className={`menuButton ${
              mobileOpen
                ? "menuOpen"
                : ""
            }`}
            whileTap={{
              scale: 0.9
            }}
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            aria-label="Open navigation menu"
          >
            <span></span>
            <span></span>
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobileMenuOverlay"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
          >
            <motion.div
              className="mobileMenu"
              initial={{
                y: -30,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -20,
                opacity: 0
              }}
              transition={{
                duration: 0.3
              }}
            >
              <div className="mobileMenuTop">
                <p className="tag">
                  NAVIGATION
                </p>

                {user && (
                  <div className="mobileUserCard">
                    <div className="userAvatar">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <span>
                        Signed in as
                      </span>

                      <strong>
                        {user.name}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="mobileMenuLinks">
                <Link
                  to="/"
                  onClick={
                    closeMenu
                  }
                >
                  <span>01</span>
                  Home
                </Link>

                <a
                  href="/#products"
                  onClick={
                    closeMenu
                  }
                >
                  <span>02</span>
                  Shop
                </a>

                <a
                  href="/#about"
                  onClick={
                    closeMenu
                  }
                >
                  <span>03</span>
                  About
                </a>

                <Link
                  to="/wishlist"
                  onClick={
                    closeMenu
                  }
                >
                  <span>04</span>

                  Wishlist

                  {wishlist.length > 0 && (
                    <small>
                      {
                        wishlist.length
                      }
                    </small>
                  )}
                </Link>

                <Link
                  to="/cart"
                  onClick={
                    closeMenu
                  }
                >
                  <span>05</span>

                  Shopping Bag

                  {cartCount > 0 && (
                    <small>
                      {cartCount}
                    </small>
                  )}
                </Link>

                {user && (
                  <Link
                    to="/orders"
                    onClick={
                      closeMenu
                    }
                  >
                    <span>06</span>
                    My Orders
                  </Link>
                )}

                {user?.role ===
                  "admin" && (
                  <Link
                    to="/admin"
                    onClick={
                      closeMenu
                    }
                  >
                    <span>07</span>
                    Admin Dashboard
                  </Link>
                )}
              </div>

              <div className="mobileMenuBottom">
                {user ? (
                  <button
                    onClick={
                      handleLogout
                    }
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={
                      closeMenu
                    }
                  >
                    Sign In →
                  </Link>
                )}

                <small>
                  DEVSTORE / 2026
                </small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
