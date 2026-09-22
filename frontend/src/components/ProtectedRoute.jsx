import React from "react";

import {
  Navigate,
  useLocation
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext.jsx";

function ProtectedRoute({
  children
}) {
  const location =
    useLocation();

  const {
    user,
    loading
  } = useAuth();

  if (loading) {
    return (
      <div className="routeLoader">
        <div className="loaderRing"></div>

        <p>
          Loading DEVSTORE...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
