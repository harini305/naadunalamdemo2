"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function addToCart(product, quantity = 1, variant = product.variants[0]) {
    const key = `${product.slug}-${variant.label}`;
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...current,
        {
          key,
          slug: product.slug,
          name: product.baseName,
          image: product.image,
          pack: variant.label,
          price: variant.price,
          quantity,
        },
      ];
    });
    setToast(`${product.baseName} added to your basket`);
  }

  function toggleWishlist(product) {
    const saved = wishlist.includes(product.slug);
    setWishlist((current) =>
      saved ? current.filter((slug) => slug !== product.slug) : [...current, product.slug],
    );
    setToast(saved ? `${product.baseName} removed from wishlist` : `${product.baseName} saved to wishlist`);
  }

  function updateQuantity(key, quantity) {
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.key !== key)
        : current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(key) {
    setCart((current) => current.filter((item) => item.key !== key));
  }

  const value = {
    cart,
    wishlist,
    cartOpen,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    addToCart,
    toggleWishlist,
    updateQuantity,
    removeFromCart,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} aria-hidden="true" />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast("")} aria-label="Dismiss notification">
            <X size={16} />
          </button>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
