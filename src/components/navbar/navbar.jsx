import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "New Arrivals", path: "/newarrival" },
  { label: "Cart", path: "/cart" },
];

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = () => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("minimog-cart") || "[]"
      );

      return cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      );
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    setCartCount(getCartCount());

    const updateCart = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("storage", updateCart);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="premium-navbar">
        <div className="premium-navbar__inner">

          {/* LOGO */}
          <Link to="/" className="premium-logo">
            <span className="premium-logo__mark">V</span>

            <span className="premium-logo__content">
              <span className="premium-logo__name">
                Vellora
              </span>

              <span className="premium-logo__sub">
                Modern essentials
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="premium-navbar__nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`premium-navbar__link ${
                  isActive(link.path)
                    ? "premium-navbar__link--active"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="premium-navbar__actions">

            {/* CART */}
            <Link
              to="/cart"
              className="premium-navbar__action premium-navbar__cart"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.6}
              />

              {cartCount > 0 && (
                <span className="premium-navbar__badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              className="premium-navbar__menu-button"
              onClick={() =>
                setMobileMenuOpen((value) => !value)
              }
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X
                  size={21}
                  strokeWidth={1.6}
                />
              ) : (
                <Menu
                  size={21}
                  strokeWidth={1.6}
                />
              )}
            </button>
          </div>
        </div>

        {/* SEARCH PANEL */}
        <div
          className={`premium-search ${
            searchOpen
              ? "premium-search--open"
              : ""
          }`}
        >
          <div className="premium-search__inner">
            <Search
              size={18}
              strokeWidth={1.5}
            />

            <input
              type="search"
              placeholder="Search products, collections..."
              autoFocus={searchOpen}
            />

            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X
                size={18}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`premium-mobile-menu ${
            mobileMenuOpen
              ? "premium-mobile-menu--open"
              : ""
          }`}
        >
          <nav>
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`premium-mobile-menu__link ${
                  isActive(link.path)
                    ? "premium-mobile-menu__link--active"
                    : ""
                }`}
              >
                <span>
                  <small>
                    {String(index + 1).padStart(2, "0")}
                  </small>

                  {link.label}
                </span>

                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                />
              </Link>
            ))}
          </nav>

          <div className="premium-mobile-menu__footer">
            <span>VELLORA</span>

            <p>
              Thoughtful pieces for everyday living.
            </p>
          </div>
        </div>
      </header>
    </>
  );
}