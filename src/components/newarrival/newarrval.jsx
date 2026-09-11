import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./newarrival.css";

const newProducts = [
  {
    id: 101,
    name: "Linen Relaxed Shirt",
    category: "Apparel",
    price: 499,
    oldPrice: null,
    image: "/new-arrivals/linen.jpg",
    badge: "Just in",
  },
  {
    id: 102,
    name: "Watch",
    category: "Assessories",
    price: 1899,
    oldPrice: null,
    image: "/new-arrivals/watch.jpg",
    badge: "New",
  },
  {
    id: 103,
    name: "Sunglasses",
    category: "Accessories",
    price: 4299,
    oldPrice: 4999,
    image: "/new-arrivals/sunglasses.jpg",
    badge: "Limited",
  },
  {
    id: 104,
    name: "Cap",
    category: "Accessories",
    price: 2999,
    oldPrice: null,
    image: "/new-arrivals/cap.jpg",
    badge: "New",
  },
  {
    id: 105,
    name: "Jeans",
    category: "Apparel",
    price: 299,
    oldPrice: null,
    image: "/new-arrivals/jeans.jpg",
    badge: "Just in",
  },
  {
    id: 106,
    name: "Jacket",
    category: "Apparel",
    price: 799,
    oldPrice: null,
    image: "/new-arrivals/jacket.jpg",
    badge: "New",
  },
  {
    id: 107,
    name: "T-shirt",
    category: "Apparel",
    price: 599,
    oldPrice: null,
    image: "/new-arrivals/t-shirt.jpg",
    badge: "New",
  },
  {
    id: 108,
    name: "Hoodie",
    category: "Apparel",
    price: 499,
    oldPrice: null,
    image: "/new-arrivals/hoodie.jpg",
    badge: "Just in",
  },
];

const categories = [
  "All",
  "Apparel",
  "Home",
  "Accessories",
];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const filteredProducts = useMemo(() => {
    let products =
      activeCategory === "All"
        ? [...newProducts]
        : newProducts.filter(
            (product) => product.category === activeCategory
          );

    if (sortBy === "low-high") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [activeCategory, sortBy]);

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const toggleWishlist = (productId) => {
    setWishlist((previousWishlist) => {
      if (previousWishlist.includes(productId)) {
        return previousWishlist.filter((id) => id !== productId);
      }

      return [...previousWishlist, productId];
    });
  };

  const addToCart = (product) => {
    try {
      const currentCart = JSON.parse(
        localStorage.getItem("minimog-cart") || "[]"
      );

      const existingProductIndex = currentCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity =
          Number(currentCart[existingProductIndex].quantity || 0) + 1;
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "minimog-cart",
        JSON.stringify(currentCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

      setCartMessage(`${product.name} added to cart`);

      setTimeout(() => {
        setCartMessage("");
      }, 2200);
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  return (
    <main className="new-arrivals-page">
      {cartMessage && (
        <div className="arrival-cart-message">
          <ShoppingBag size={16} strokeWidth={1.5} />
          {cartMessage}
        </div>
      )}

      <section className="new-arrivals-hero">
        <div className="new-arrivals-hero__content">
          <span className="new-arrivals-eyebrow">
            The latest collection
          </span>

          <h1>
            New
            <em> arrivals.</em>
          </h1>

          <p>
            Thoughtfully selected pieces designed to bring a quieter,
            more considered feeling to everyday living.
          </p>

          <a
            href="#new-arrivals-products"
            className="new-arrivals-hero__link"
          >
            Explore the collection
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        </div>

        <div className="new-arrivals-hero__image">
          <img
            src="/new-arrivals/model.jpg"
            alt="New arrivals collection"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="new-arrivals-hero__caption">
            <span>01 — 04</span>
            <p>Quiet forms. Everyday beauty.</p>
          </div>
        </div>
      </section>

      <section
        className="new-arrivals-products"
        id="new-arrivals-products"
      >
        <div className="new-arrivals-toolbar">
          <div className="new-arrivals-toolbar__left">
            <span className="new-arrivals-section-label">
              Latest pieces
            </span>

            <strong>
              {String(filteredProducts.length).padStart(2, "0")} products
            </strong>
          </div>

          <button
            type="button"
            className="mobile-filter-button"
            onClick={() => setMobileFilterOpen((value) => !value)}
          >
            <SlidersHorizontal size={15} />
            Filter
          </button>

          <div
            className={`new-arrivals-filters ${
              mobileFilterOpen
                ? "new-arrivals-filters--open"
                : ""
            }`}
          >
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "category-filter__button category-filter__button--active"
                      : "category-filter__button"
                  }
                  onClick={() => {
                    setActiveCategory(category);
                    setMobileFilterOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="sort-filter">
              Sort by

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low-high">
                  Price: Low to high
                </option>
                <option value="high-low">
                  Price: High to low
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className="new-arrivals-grid">
          {filteredProducts.map((product) => (
            <article className="arrival-card" key={product.id}>
              <div className="arrival-card__image">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </Link>

                <span className="arrival-card__badge">
                  {product.badge}
                </span>

                <button
                  type="button"
                  className={`arrival-card__wishlist ${
                    wishlist.includes(product.id)
                      ? "arrival-card__wishlist--active"
                      : ""
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={17}
                    strokeWidth={1.5}
                    fill={
                      wishlist.includes(product.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <button
                  type="button"
                  className="arrival-card__quick-add"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag size={15} strokeWidth={1.5} />
                  Add to cart
                </button>
              </div>

              <div className="arrival-card__details">
                <div>
                  <span className="arrival-card__category">
                    {product.category}
                  </span>

                  <h2>
                    <Link to={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h2>
                </div>

                <div className="arrival-card__price">
                  <strong>{formatPrice(product.price)}</strong>

                  {product.oldPrice && (
                    <del>{formatPrice(product.oldPrice)}</del>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="new-arrivals-note">
        <div className="new-arrivals-note__line" />

        <div className="new-arrivals-note__content">
          <span className="new-arrivals-section-label">
            Designed slowly
          </span>

          <h2>
            Objects with a
            <em> lasting presence.</em>
          </h2>

          <p>
            Every new piece is selected for its material, function
            and ability to become part of your everyday rituals.
          </p>
        </div>

        <div className="new-arrivals-note__number">
          02
        </div>
      </section>
    </main>
  );
}