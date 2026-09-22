import React, {
  useEffect,
  useState
} from "react";

import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence
} from "framer-motion";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Orders from "./pages/Orders.jsx";
import Admin from "./pages/Admin.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

import CursorGlow from "./components/motion/CursorGlow.jsx";
import ScrollProgress from "./components/motion/ScrollProgress.jsx";
import AmbientBackground from "./components/motion/AmbientBackground.jsx";
import PageTransition from "./components/motion/PageTransition.jsx";

function App() {
  const location =
    useLocation();

  const [starting, setStarting] =
    useState(true);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setStarting(false);
      }, 1200);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {starting && (
          <LoadingScreen />
        )}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <AmbientBackground />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <ProductDetails />
              </PageTransition>
            }
          />

          <Route
            path="/wishlist"
            element={
              <PageTransition>
                <Wishlist />
              </PageTransition>
            }
          />

          <Route
            path="/cart"
            element={
              <PageTransition>
                <Cart />
              </PageTransition>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Checkout />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Orders />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success/:id"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <OrderSuccess />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PageTransition>
                  <Admin />
                </PageTransition>
              </AdminRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/register"
            element={
              <PageTransition>
                <Register />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
