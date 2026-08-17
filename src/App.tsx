import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import ProductDetails from "./components/pages/ProductDetails";
import Cart from "./components/pages/Cart";
import Wishlist from "./components/pages/Wishlist";
import Checkout from "./components/pages/Checkout";
import CategoriesPage from "./components/pages/CategoriesPage";
import Contact from "./components/pages/Contact";
import Account from "./components/pages/Account";
import { supabase } from "./lib/supabase";
import { useSupabaseCart } from "./hooks/useSupabaseCart";
import { useSupabaseWishlist } from "./hooks/useSupabaseWishlist";
import type { Product } from "./types";
import type { User } from "@supabase/supabase-js";

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const { cartItems, setCartItems, addToCart, updateQuantity, removeFromCart } =
    useSupabaseCart(user);
  const { wishlist, toggleWishlist } = useSupabaseWishlist(user);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }
    addToCart(product.id);
  };

  const handleToggleWishlist = (product: Product) => {
    if (!user) {
      alert("Please sign in to save items to your wishlist.");
      return;
    }
    toggleWishlist(product);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
      />
      <main className={`flex-1 ${isHome ? "" : "pt-20"}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetails
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
