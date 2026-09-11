import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  X,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./cart.css";

const FREE_SHIPPING_LIMIT = 99;

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

export default function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("minimog-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState(initialCheckoutForm);
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("minimog-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = showCheckout ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCheckout]);

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= FREE_SHIPPING_LIMIT
        ? 0
        : 8;

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_LIMIT - subtotal,
    0
  );

  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_LIMIT) * 100,
    100
  );

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: Number(item.quantity) + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: Number(item.quantity) - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(false);
  };

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === "welcome10") {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      alert("Try promo code: WELCOME10");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setOrderPlaced(false);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setFormErrors({});

    if (orderPlaced) {
      setCheckoutForm(initialCheckoutForm);
      setOrderPlaced(false);
    }
  };

  const handleFormChange = (field) => (event) => {
    setCheckoutForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setFormErrors((current) => {
      if (!current[field]) return current;

      const { [field]: removed, ...rest } = current;

      return rest;
    });
  };

  const validateForm = () => {
    const errors = {};

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
      if (!checkoutForm[field].trim()) {
        errors[field] = "Required";
      }
    });

    if (
      checkoutForm.email.trim() &&
      !/^\S+@\S+\.\S+$/.test(checkoutForm.email.trim())
    ) {
      errors.email = "Enter a valid email";
    }

    return errors;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: checkoutForm,

            products: cart.map((item) => ({
              productId: Number(item.id),
              name: item.name,
              price: Number(item.price),
              quantity: Number(item.quantity),
              image: item.image,
            })),

            subtotal: Number(subtotal),
            shipping: Number(shipping),
            discount: Number(discount),
            total: Number(total),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save order"
        );
      }

      console.log("Order saved successfully:", data);

      setOrderPlaced(true);
      setCart([]);
      setPromoApplied(false);
    } catch (error) {
      console.error("Order save error:", error);

      alert(
        "Order save nahi ho saka. Please make sure backend is running."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <span className="cart-eyebrow">YOUR SHOPPING BAG</span>

        <h1>
          Almost
          <br />
          <em>yours.</em>
        </h1>

        <p>
          Review your selected pieces before completing your order.
        </p>
      </section>

      <section className="cart-layout">
        <div className="cart-main">
          <div className="cart-heading">
            <div>
              <span className="cart-section-label">
                YOUR SELECTION
              </span>

              <h2>
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </h2>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                className="clear-cart"
                onClick={clearCart}
              >
                Clear bag
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <ShoppingBag size={34} strokeWidth={1.2} />
              </div>

              <h2>Your bag is empty</h2>

              <p>
                You have not added anything to your bag yet.
              </p>

              <Link
                to="/shop"
                className="cart-dark-button"
              >
                Explore the shop
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <article
                  className="cart-product"
                  key={item.id}
                >
                  <div className="cart-product__image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-product__details">
                    <div className="cart-product__top">
                      <div>
                        <span className="cart-product__category">
                          MINIMOG EDIT
                        </span>

                        <h3>{item.name}</h3>

                        <p className="cart-product__price">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-product__bottom">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <strong>
                        $
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <Link
            to="/shop"
            className="continue-shopping"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>
        </div>

        <aside className="cart-summary">
          <div className="cart-summary__header">
            <span className="cart-section-label">
              ORDER SUMMARY
            </span>

            <h2>Your order</h2>
          </div>

          {cart.length > 0 && (
            <>
              <div className="shipping-message">
                <Truck
                  size={18}
                  strokeWidth={1.5}
                />

                {remainingForFreeShipping > 0 ? (
                  <p>
                    Add{" "}
                    <strong>
                      $
                      {remainingForFreeShipping.toFixed(
                        2
                      )}
                    </strong>{" "}
                    more for free shipping.
                  </p>
                ) : (
                  <p>
                    You qualify for{" "}
                    <strong>free shipping.</strong>
                  </p>
                )}
              </div>

              <div className="shipping-progress">
                <span
                  style={{
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>
            </>
          )}

          <div className="summary-lines">
            <div>
              <span>Subtotal</span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>Shipping</span>

              <strong>
                {shipping === 0 && subtotal > 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </strong>
            </div>

            {promoApplied && (
              <div className="summary-discount">
                <span>Welcome discount</span>

                <strong>
                  -${discount.toFixed(2)}
                </strong>
              </div>
            )}
          </div>

          <div className="promo-form">
            <input
              type="text"
              value={promoCode}
              onChange={(event) =>
                setPromoCode(event.target.value)
              }
              placeholder="Promo code"
            />

            <button
              type="button"
              onClick={applyPromo}
            >
              Apply
            </button>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${total.toFixed(2)}
            </strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to checkout
            <ArrowRight size={17} />
          </button>

          <div className="secure-checkout">
            <ShieldCheck
              size={16}
              strokeWidth={1.5}
            />

            <span>
              Secure checkout and protected payment
            </span>
          </div>
        </aside>
      </section>

      {showCheckout && (
        <div
          className="checkout-overlay"
          onClick={closeCheckout}
        >
          <div
            className="checkout-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="checkout-close"
              onClick={closeCheckout}
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>

            {orderPlaced ? (
              <div className="checkout-success">
                <div className="checkout-success__icon">
                  <CheckCircle2
                    size={40}
                    strokeWidth={1.3}
                  />
                </div>

                <h2>Order confirmed</h2>

                <p>
                  Thank you,{" "}
                  {checkoutForm.fullName.split(" ")[0]}.
                  Your order total of{" "}
                  <strong>
                    ${total.toFixed(2)}
                  </strong>{" "}
                  will be shipped to:
                </p>

                <p className="checkout-success__address">
                  {checkoutForm.address},{" "}
                  {checkoutForm.city},{" "}
                  {checkoutForm.state}{" "}
                  {checkoutForm.zip},{" "}
                  {checkoutForm.country}
                </p>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={closeCheckout}
                >
                  Continue shopping
                  <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <span className="cart-section-label">
                  CHECKOUT DETAILS
                </span>

                <h2>Delivery information</h2>

                <p className="checkout-subtext">
                  Enter your details and shipping address
                  to complete the order.
                </p>

                <form
                  className="checkout-form"
                  onSubmit={handlePlaceOrder}
                >
                  <div className="checkout-form__group">
                    <label>Full name</label>

                    <input
                      type="text"
                      value={checkoutForm.fullName}
                      onChange={handleFormChange(
                        "fullName"
                      )}
                      placeholder="Your full name"
                    />

                    {formErrors.fullName && (
                      <span className="checkout-error">
                        {formErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__group">
                      <label>Email</label>

                      <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={handleFormChange(
                          "email"
                        )}
                        placeholder="you@example.com"
                      />

                      {formErrors.email && (
                        <span className="checkout-error">
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__group">
                      <label>Phone</label>

                      <input
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={handleFormChange(
                          "phone"
                        )}
                        placeholder="03XX XXXXXXX"
                      />

                      {formErrors.phone && (
                        <span className="checkout-error">
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="checkout-form__group">
                    <label>Street address</label>

                    <input
                      type="text"
                      value={checkoutForm.address}
                      onChange={handleFormChange(
                        "address"
                      )}
                      placeholder="House no, street, area"
                    />

                    {formErrors.address && (
                      <span className="checkout-error">
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__group">
                      <label>City</label>

                      <input
                        type="text"
                        value={checkoutForm.city}
                        onChange={handleFormChange(
                          "city"
                        )}
                        placeholder="Karachi"
                      />

                      {formErrors.city && (
                        <span className="checkout-error">
                          {formErrors.city}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__group">
                      <label>State / Province</label>

                      <input
                        type="text"
                        value={checkoutForm.state}
                        onChange={handleFormChange(
                          "state"
                        )}
                        placeholder="Sindh"
                      />

                      {formErrors.state && (
                        <span className="checkout-error">
                          {formErrors.state}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__group">
                      <label>Postal code</label>

                      <input
                        type="text"
                        value={checkoutForm.zip}
                        onChange={handleFormChange(
                          "zip"
                        )}
                        placeholder="74400"
                      />

                      {formErrors.zip && (
                        <span className="checkout-error">
                          {formErrors.zip}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__group">
                      <label>Country</label>

                      <input
                        type="text"
                        value={checkoutForm.country}
                        onChange={handleFormChange(
                          "country"
                        )}
                        placeholder="Pakistan"
                      />

                      {formErrors.country && (
                        <span className="checkout-error">
                          {formErrors.country}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="checkout-modal__total">
                    <span>Total to pay</span>

                    <strong>
                      ${total.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="checkout-button"
                    disabled={isSaving}
                  >
                    {isSaving
                      ? "Placing order..."
                      : "Place order"}

                    {!isSaving && (
                      <ArrowRight size={17} />
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}