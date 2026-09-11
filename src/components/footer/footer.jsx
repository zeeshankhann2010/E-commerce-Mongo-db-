import { ArrowUpRight, Mail } from "lucide-react";
import "./footer.css";

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="premium-footer">
      {/* TOP FOOTER */}
      <div className="footer-main">
        {/* BRAND */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            VELLORA
          </a>

          <p className="footer-description">
            Refined essentials designed for modern living.
            <br />
            Less noise. More style.
          </p>

          <a href="/shop" className="footer-shop-link">
            Explore Collection
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </a>
        </div>

        {/* SHOP */}
        <div className="footer-column">
          <h3>Shop</h3>

          <a href="/shop#men">Men</a>
          <a href="/shop#women">Women</a>
          <a href="/shop#kids">Kids</a>
          <a href="/shop#footwear">Footwear</a>
          <a href="/shop#accessories">Accessories</a>
        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h3>Explore</h3>

          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <h3>Stay in the know</h3>

          <p>
            Subscribe for new arrivals, exclusive edits
            and selected offers.
          </p>

          <form onSubmit={handleNewsletter} className="newsletter-form">
            <div className="newsletter-input">
              <Mail size={18} strokeWidth={1.5} />

              <input
                type="email"
                placeholder="Your email address"
                required
              />

              <button type="submit" aria-label="Subscribe">
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* BIG STATEMENT */}
      <div className="footer-statement">
        <h2>
          LESS NOISE.
          <br />
          <span>MORE STYLE.</span>
        </h2>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MINIMOG. All rights reserved.
        </p>

        {/* SOCIAL LINKS */}
        <div className="footer-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>

        {/* LEGAL */}
        <div className="footer-legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;