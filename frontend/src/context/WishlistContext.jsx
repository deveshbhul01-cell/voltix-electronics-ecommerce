import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("devstore-wishlist")
      ) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "devstore-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== product.id
        );
      }

      return [...current, product];
    });
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
