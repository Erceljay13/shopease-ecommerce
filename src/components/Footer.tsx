export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-display italic text-white text-xl mb-3">
            ShopEase
          </h3>
          <p className="text-sm leading-relaxed">
            Modern shopping, made easy. Quality products delivered to your door.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-wide mb-4">
            Shop
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/products" className="hover:text-white transition">
                All Products
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-white transition">
                Categories
              </a>
            </li>
            <li>
              <a href="/wishlist" className="hover:text-white transition">
                Wishlist
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-wide mb-4">
            Support
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white transition">
                Shipping Info
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-wide mb-4">
            Newsletter
          </h4>
          <p className="text-sm mb-4">
            Get updates on new arrivals and offers.
          </p>
          <div className="flex border-b border-white/20 pb-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="text-white text-sm font-medium hover:text-brass transition">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
