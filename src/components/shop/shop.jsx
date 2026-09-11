import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  X,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import "./shop.css";

/* =========================
   MEN PRODUCTS
========================= */

const menProducts = [
  {
    id: 1,
    name: "Classic Linen Shirt",
    price: 69,
    image: "/mens/linen.jpg",
  },
  {
    id: 2,
    name: "Essential Overshirt",
    price: 89,
    image: "/mens/essential.jpg",
  },
  {
    id: 3,
    name: "Premium Cotton Tee",
    price: 45,
    image: "/mens/tee.jpg",
  },
  {
    id: 4,
    name: "Relaxed Fit Jacket",
    price: 119,
    image: "/mens/jacket.jpg",
  },
];

/* =========================
   WOMEN PRODUCTS
========================= */

const womenProducts = [
  {
    id: 5,
    name: "Red Oversized",
    price: 99,
    image: "/womens/womens-1.jpg",
  },
  {
    id: 6,
    name: "Minimal Blazer",
    price: 129,
    image: "/womens/womens-2.jpg",
  },
  {
    id: 7,
    name: "Spiderman Shirt",
    price: 59,
    image: "/womens/womens-3.jpg",
  },
  {
    id: 8,
    name: "Classic Shirt",
    price: 79,
    image: "/womens/womens-4.jpg",
  },
];

/* =========================
   KIDS PRODUCTS
========================= */

const kidsProducts = [
  {
    id: 9,
    name: "Everyday Cotton Set",
    price: 49,
    image: "/kids/kids-1.jpg",
  },
  {
    id: 10,
    name: "Mini Denim Jacket",
    price: 65,
    image: "/kids/kids-2.jpg",
  },
  {
    id: 11,
    name: "Kids Casual Outfit",
    price: 55,
    image: "/kids/kids-3.jpg",
  },
  {
    id: 12,
    name: "Classic Kids Hoodie",
    price: 59,
    image: "/kids/kids-4.jpg",
  },
];

/* =========================
   FOOTWEAR PRODUCTS
========================= */

const footwearProducts = [
  {
    id: 13,
    name: "Classic Sneakers",
    price: 99,
    image: "/footwear/footwear-1.jpg",
  },
  {
    id: 14,
    name: "Minimal White Sneakers",
    price: 109,
    image: "/footwear/footwear-2.jpg",
  },
  {
    id: 15,
    name: "Premium Loafers",
    price: 129,
    image: "/footwear/footwear-3.jpg",
  },
  {
    id: 16,
    name: "Everyday Casual Shoes",
    price: 89,
    image: "/footwear/footwear-4.jpg",
  },
];

/* =========================
   WATCH PRODUCTS
========================= */

const watchProducts = [
  {
    id: 17,
    name: "Classic Steel Watch",
    price: 149,
    image: "/watches/watch-1.jpg",
  },
  {
    id: 18,
    name: "Minimal Black Watch",
    price: 179,
    image: "/watches/watch-2.jpg",
  },
  {
    id: 19,
    name: "Modern Leather Watch",
    price: 159,
    image: "/watches/watch-3.jpg",
  },
  {
    id: 20,
    name: "Premium Chronograph",
    price: 199,
    image: "/watches/watch-4.jpg",
  },
];

/* =========================
   BAG PRODUCTS
========================= */

const bagProducts = [
  {
    id: 21,
    name: "Classic Bag",
    price: 139,
    image: "/bags/bag-1.jpg",
  },
  {
    id: 22,
    name: "Minimal Shoulder Bag",
    price: 119,
    image: "/bags/bag-2.jpg",
  },
  {
    id: 23,
    name: "College Bag",
    price: 99,
    image: "/bags/bag-3.jpg",
  },
  {
    id: 24,
    name: "Premium Bag",
    price: 169,
    image: "/bags/bag-4.jpg",
  },
];

/* =========================
   ACCESSORIES PRODUCTS
========================= */

const accessoryProducts = [
  {
    id: 25,
    name: "Minimal Wallet",
    price: 99,
    image: "/accessories/accessory-1.jpg",
  },
  {
    id: 26,
    name: "Premium Perfume",
    price: 79,
    image: "/accessories/accessory-2.jpg",
  },
  {
    id: 27,
    name: "Classic Cap",
    price: 59,
    image: "/accessories/accessory-3.jpg",
  },
  {
    id: 28,
    name: "Sunglasses",
    price: 39,
    image: "/accessories/accessory-4.jpg",
  },
];

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          type="button"
          className="product-add"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="product-details">
        <h3>{product.name}</h3>

        <div className="product-meta">
          <span className="product-price">
            ${product.price}
          </span>

          <button
            type="button"
            className="add-text"
            onClick={() => onAdd(product)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================
   COLLECTION
========================= */

function Collection({
  number,
  title,
  description,
  products,
  id,
  onAdd,
}) {
  return (
    <section className="collection" id={id}>
      <div className="collection-top">
        <div>
          <span className="collection-number">
            0{number}
          </span>

          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        <a
          href={`#${id}`}
          className="view-collection"
        >
          View Collection
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================
   CART DRAWER
========================= */

function CartDrawer({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`cart-drawer ${isOpen ? "open" : ""
          }`}
      >
        <div className="cart-header">
          <div>
            <span className="cart-label">
              YOUR BAG
            </span>

            <h2>
              Cart{" "}
              <span>
                ({totalItems})
              </span>
            </h2>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={21} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag
                size={42}
                strokeWidth={1}
              />

              <h3>Your bag is empty</h3>

              <p>
                Add something beautiful to your bag.
              </p>

              <button
                type="button"
                className="continue-shopping"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <h3>{item.name}</h3>

                          <p>
                            ${item.price}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="remove-item"
                          onClick={() =>
                            onRemove(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            onDecrease(item.id)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            onIncrease(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>

                  <strong>
                    ${subtotal.toFixed(2)}
                  </strong>
                </div>

                <p>
                  Shipping and taxes calculated at
                  checkout.
                </p>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={onCheckout}
                >
                  Checkout
                  <ArrowRight size={17} />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

/* =========================
   CHECKOUT MODAL
========================= */

const initialCheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  onPlaceOrder,
}) {
  const [form, setForm] = useState(initialCheckoutForm);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setErrors((current) => {
      if (!current[field]) return current;
      const { [field]: _removed, ...rest } = current;
      return rest;
    });
  };

  const validate = () => {
    const nextErrors = {};
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zip",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = "Required";
      }
    });

    if (
      form.email.trim() &&
      !/^\S+@\S+\.\S+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Enter a valid email";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          products: cart.map((item) => ({
            productId: item.id,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity),
            image: item.image,
          })),
          subtotal: Number(subtotal),
          shipping: 0,
          discount: 0,
          total: Number(subtotal),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Order saved:", data);
      setOrderPlaced(true);
      onPlaceOrder();
    } catch (error) {
      console.error("Order error:", error);
      alert("Order save nahi ho saka. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();

    if (orderPlaced) {
      setForm(initialCheckoutForm);
      setErrors({});
      setOrderPlaced(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div
        className="checkout-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="checkout-close"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          <X size={18} />
        </button>

        {orderPlaced ? (
          <div className="checkout-success">
            <div className="checkout-success__icon">
              <CheckCircle2 size={40} strokeWidth={1.3} />
            </div>

            <h2>Order confirmed</h2>

            <p>
              Thank you, {form.fullName.split(" ")[0]}. Your
              order total of{" "}
              <strong>${subtotal.toFixed(2)}</strong> will be
              shipped to:
            </p>

            <p className="checkout-success__address">
              {form.address}, {form.city}, {form.state}{" "}
              {form.zip}, {form.country}
            </p>

            <button
              type="button"
              className="checkout-button"
              onClick={handleClose}
            >
              Continue shopping
              <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <span className="checkout-label">
              CHECKOUT DETAILS
            </span>
            <h2>Delivery information</h2>
            <p className="checkout-subtext">
              Enter your details and shipping address to
              complete the order.
            </p>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-form__group">
                <label>Full name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <span className="checkout-error">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="checkout-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="checkout-form__group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="03XX XXXXXXX"
                  />
                  {errors.phone && (
                    <span className="checkout-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout-form__group">
                <label>Street address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="House no, street, area"
                />
                {errors.address && (
                  <span className="checkout-error">
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label>City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="Karachi"
                  />
                  {errors.city && (
                    <span className="checkout-error">
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="checkout-form__group">
                  <label>State / Province</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={handleChange("state")}
                    placeholder="Sindh"
                  />
                  {errors.state && (
                    <span className="checkout-error">
                      {errors.state}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label>Postal code</label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={handleChange("zip")}
                    placeholder="74400"
                  />
                  {errors.zip && (
                    <span className="checkout-error">
                      {errors.zip}
                    </span>
                  )}
                </div>

                <div className="checkout-form__group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={handleChange("country")}
                    placeholder="Pakistan"
                  />
                  {errors.country && (
                    <span className="checkout-error">
                      {errors.country}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout-modal__total">
                <span>Total to pay</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <button type="submit" className="checkout-button">
                Place order
                <ArrowRight size={17} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================
   SHOP PAGE
========================= */

export default function Shop() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart =
        localStorage.getItem("minimog-cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  /* SAVE CART */
  useEffect(() => {
    localStorage.setItem(
      "minimog-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* ADD TO CART */
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity:
                item.quantity + 1,
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

    setIsCartOpen(true);
  };

  /* INCREASE QUANTITY */
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity:
              item.quantity + 1,
          }
          : item
      )
    );
  };

  /* DECREASE QUANTITY */
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  /* REMOVE FROM CART */
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* CHECKOUT */
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  /* TOTAL ITEMS */
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main className="shop-page">

      {/* =========================
          SHOP INTRO
      ========================= */}

      <section className="shop-intro">
        <span className="shop-label">
          THE SHOP
        </span>

        <h1>
          Curated for
          <br />
          <em>every style.</em>
        </h1>

        <p>
          Discover thoughtfully selected pieces
          for men, women, and little ones.
        </p>

        <div className="shop-categories">
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#kids">Kids</a>
          <a href="#footwear">Footwear</a>
          <a href="#watches">Watches</a>
          <a href="#bags">Bags</a>
          <a href="#accessories">
            Accessories
          </a>
        </div>
      </section>

      {/* =========================
          BAG BAR
      ========================= */}

      <div className="bag-bar">
        <span>Our Collections</span>

        <button
          type="button"
          className="bag-count"
          onClick={() =>
            setIsCartOpen(true)
          }
        >
          <ShoppingBag size={17} />

          <span>Bag</span>

          <strong>{totalItems}</strong>
        </button>
      </div>

      {/* =========================
          MEN
      ========================= */}

      <Collection
        id="men"
        number={1}
        title="Men's Collection"
        description="Refined essentials designed for everyday confidence."
        products={menProducts}
        onAdd={addToCart}
      />

      {/* =========================
          WOMEN
      ========================= */}

      <Collection
        id="women"
        number={2}
        title="Women's Collection"
        description="Elegant silhouettes and timeless pieces made to stand out."
        products={womenProducts}
        onAdd={addToCart}
      />

      {/* =========================
          KIDS
      ========================= */}

      <Collection
        id="kids"
        number={3}
        title="Kids' Collection"
        description="Comfortable, playful pieces made for every little adventure."
        products={kidsProducts}
        onAdd={addToCart}
      />

      {/* =========================
          FOOTWEAR
      ========================= */}

      <Collection
        id="footwear"
        number={4}
        title="Footwear"
        description="Step into refined comfort with timeless everyday footwear."
        products={footwearProducts}
        onAdd={addToCart}
      />

      {/* =========================
          WATCHES
      ========================= */}

      <Collection
        id="watches"
        number={5}
        title="Watches"
        description="Elegant timepieces designed to complete every look."
        products={watchProducts}
        onAdd={addToCart}
      />

      {/* =========================
          BAGS
      ========================= */}

      <Collection
        id="bags"
        number={6}
        title="Bags"
        description="Functional silhouettes crafted for everyday movement."
        products={bagProducts}
        onAdd={addToCart}
      />

      {/* =========================
          ACCESSORIES
      ========================= */}

      <Collection
        id="accessories"
        number={7}
        title="Accessories"
        description="Finishing touches that bring your personal style together."
        products={accessoryProducts}
        onAdd={addToCart}
      />

      {/* =========================
          SHOP FOOTER
      ========================= */}

      <section className="shop-footer">
        <span>MINIMOG</span>

        <h2>
          Less noise.
          <br />
          <em>More style.</em>
        </h2>

        <p>
          Simple pieces. Beautiful details.
          Made for your everyday.
        </p>
      </section>

      {/* =========================
          CART DRAWER
      ========================= */}

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* =========================
          CHECKOUT MODAL
      ========================= */}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        onPlaceOrder={handlePlaceOrder}
      />

    </main>
  );
}