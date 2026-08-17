import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useScrolled } from "../hooks/useScrolled";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
}

export default function Navbar({ cartCount, wishlistCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  const textClass = solid ? "text-ink" : "text-white";
  const textMutedClass = solid ? "text-stone" : "text-white/70";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? "bg-paper/95 backdrop-blur border-b border-stone-light" : "bg-transparent border-b border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className={`font-display italic text-2xl tracking-tight transition-colors ${textClass}`}
          >
            ShopEase
          </Link>

          <nav
            className={`hidden md:flex items-center gap-10 text-[13px] font-medium uppercase tracking-wide transition-colors ${textMutedClass}`}
          >
            <Link
              to="/"
              className={`${solid ? "hover:text-ink" : "hover:text-white"} transition`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${solid ? "hover:text-ink" : "hover:text-white"} transition`}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={`${solid ? "hover:text-ink" : "hover:text-white"} transition`}
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className={`${solid ? "hover:text-ink" : "hover:text-white"} transition`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              to="/wishlist"
              className={`relative transition-colors ${textClass} hover:opacity-70`}
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className={`relative transition-colors ${textClass} hover:opacity-70`}
            >
              <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className={`transition-colors ${textClass} hover:opacity-70`}
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <button
              className={`md:hidden transition-colors ${textClass}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-paper z-40 px-6 py-10">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-display text-ink border-b border-stone-light"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-display text-ink border-b border-stone-light"
              >
                Products
              </Link>
              <Link
                to="/categories"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-display text-ink border-b border-stone-light"
              >
                Categories
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-display text-ink border-b border-stone-light"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
