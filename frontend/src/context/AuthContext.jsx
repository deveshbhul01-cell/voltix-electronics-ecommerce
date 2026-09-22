import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("devstore-user")
      );
    } catch {
      return null;
    }
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token =
        localStorage.getItem(
          "devstore-token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } =
          await api.get("/auth/profile");

        setUser(data.user);

        localStorage.setItem(
          "devstore-user",
          JSON.stringify(data.user)
        );
      } catch {
        localStorage.removeItem(
          "devstore-token"
        );

        localStorage.removeItem(
          "devstore-user"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const register = async (
    name,
    email,
    password
  ) => {
    const { data } = await api.post(
      "/auth/register",
      {
        name,
        email,
        password
      }
    );

    localStorage.setItem(
      "devstore-token",
      data.token
    );

    localStorage.setItem(
      "devstore-user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const login = async (
    email,
    password
  ) => {
    const { data } = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    localStorage.setItem(
      "devstore-token",
      data.token
    );

    localStorage.setItem(
      "devstore-user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      "devstore-token"
    );

    localStorage.removeItem(
      "devstore-user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
