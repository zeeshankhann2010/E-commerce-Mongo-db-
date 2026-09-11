import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import "./home.css";

const categories = [
  {
    name: "Men's Fashion",
    image: "/home/mens.jpg",
    link: "/shop#men",
  },
  {
    name: "Women's Fashion",
    image: "/home/womens.jpg",
    link: "/shop#women",
  },
  {
    name: "Footwear",
    image: "/home/foot.jpg",
    link: "/shop",
  },
  {
    name: "Watches",
    image: "/home/watches.jpg",
    link: "/shop",
  },
  {
    name: "Bags",
    image: "/home/bags.jpg",
    link: "/shop",
  },
  {
    name: "Accessories",
    image: "/home/accessories.jpg",
    link: "/shop",
  },
];

const featuredProducts = [
  {
    id: 101,
    badge: "Sale",
    name: "Urban Backpack",
    price: 59,
    oldPrice: 79,
    rating: 4.5,
    reviews: 128,
    image: "/home/backpack.jpg",
  },
  {
    id: 102,
    badge: "New",
    name: "Minimal White Sneakers",
    price: 79,
    oldPrice: null,
    rating: 4.8,
    reviews: 94,
    image: "/home/sneakers.jpg",
  },
  {
    id: 103,
    badge: null,
    name: "Classic Brown Watch",
    price: 129,
    oldPrice: null,
    rating: 4.6,
    reviews: 64,
    image: "/home/brownwatch.jpg",
  },
  {
    id: 104,
    badge: null,
    name: "Polarized Sunglasses",
    price: 49,
    oldPrice: null,
    rating: 4.4,
    reviews: 82,
    image: "/home/sunglasses.jpg",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "On orders over $99",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "30-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "Personal Support",
    text: "We are here to help",
  },
];

function HomeProductCard({ product, onAdd }) {
  return (
    <article className="home-product">
      <div className="home-product__image-wrap">
        {product.badge && (
          <span
            className={`home-product__badge home-product__badge--${product.badge.toLowerCase()}`}
          >
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="home-product__image"
        />

        <button
          type="button"
          className="home-product__add"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag size={17} />
        </button>
      </div>

      <div className="home-product__content">
        <h3>{product.name}</h3>

        <div className="home-product__rating">
          <Star size={13} fill="currentColor" />
          <span>{product.rating}</span>
          <small>({product.reviews})</small>
        </div>

        <div className="home-product__bottom">
          <strong>${product.price}</strong>

          {product.oldPrice && (
            <del>${product.oldPrice}</del>
          )}

          <button
            type="button"
            onClick={() => onAdd(product)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("minimog-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("minimog-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setMessage(`${product.name} added to your bag`);

    setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="home-page">
      {message && (
        <div className="home-toast">
          <ShoppingBag size={16} />
          {message}
        </div>
      )}

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-eyebrow">THE NEW STANDARD</span>

          <h1>
            Everyday pieces.
            <br />
            <em>Elevated beautifully.</em>
          </h1>

          <p>
            Discover a thoughtful collection of modern essentials,
            selected for quality, comfort, and timeless style.
          </p>

          <div className="home-hero__actions">
            <a href="/shop" className="home-button home-button--dark">
              Explore the shop
              <ArrowRight size={17} />
            </a>

            <a
              href="/shop#women"
              className="home-button home-button--light"
            >
              View collection
            </a>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-main">
            <img
              src="/home/featured.jpg"
              alt="Featured fashion collection"
            />
          </div>

          <div className="home-hero__image-small">
            <img
              src="/home/minimal.jpg"
              alt="Minimal fashion detail"
            />
          </div>

          <div className="home-hero__note">
            <span>01</span>
            <p>Curated for<br />modern living</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="home-benefits">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="home-benefit" key={title}>
            <Icon size={21} strokeWidth={1.5} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="home-section">
        <div className="home-section__heading">
          <div>
            <span className="home-eyebrow">EXPLORE</span>
            <h2>Shop by category</h2>
          </div>

          <a href="/shop" className="home-text-link">
            View all
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="home-categories">
          {categories.map((category) => (
            <a
              href={category.link}
              className="home-category"
              key={category.name}
            >
              <div className="home-category__image">
                <img src={category.image} alt={category.name} />
              </div>

              <div className="home-category__footer">
                <span>{category.name}</span>
                <ArrowRight size={15} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="home-editorial">
        <div className="home-editorial__image">
          <img
            src="/home/traditional.jpg"
            alt="The art of everyday dressing"
          />
        </div>

        <div className="home-editorial__content">
          <span className="home-eyebrow">OUR PHILOSOPHY</span>

          <h2>
            Less, but
            <br />
            <em>better.</em>
          </h2>

          <p>
            We believe good style does not need to be complicated.
            Every piece is chosen to work effortlessly in your
            everyday wardrobe.
          </p>

          <a href="/shop" className="home-text-link">
            Discover our edit
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="home-section home-section--products">
        <div className="home-section__heading">
          <div>
            <span className="home-eyebrow">THE EDIT</span>
            <h2>Trending right now</h2>
          </div>

          <a href="/shop" className="home-text-link">
            View all products
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="home-products">
          {featuredProducts.map((product) => (
            <HomeProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-final">
        <span className="home-eyebrow">MINIMOG</span>

        <h2>
          Make space for
          <br />
          <em>better things.</em>
        </h2>

        <p>
          Beautiful essentials for the way you live now.
        </p>

        <a href="/shop" className="home-button home-button--dark">
          Start shopping
          <ArrowRight size={17} />
        </a>

        {cartCount > 0 && (
          <a href="/shop" className="home-cart-hint">
            <ShoppingBag size={15} />
            {cartCount} item{cartCount > 1 ? "s" : ""} in your bag
          </a>
        )}
      </section>
    </main>
  );
}