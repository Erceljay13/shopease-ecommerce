import { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../../types";
import { formatPrice } from "../../lib/formatPrice";

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => cartItems.some((item) => item.product.id === id)),
    );
  }, [cartItems]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const allSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : cartItems.map((item) => item.product.id));
  };

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.product.id),
  );
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );
  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { items: selectedItems } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">
          Your cart is empty
        </h1>
        <p className="text-stone mb-8">
          Looks like you have not added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brass" />
        <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
          Cart
        </span>
      </div>
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <h1 className="font-display text-4xl text-ink">Shopping Cart</h1>
        <Link
          to="/products"
          className="flex items-center gap-2 text-xs font-medium text-ink uppercase tracking-wide hover:text-emerald transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Continue Shopping
        </Link>
      </div>

      {remainingForFreeShipping > 0 ? (
        <div className="bg-stone-light/50 px-6 py-4 mb-10">
          <p className="text-sm text-ink mb-2">
            Add{" "}
            <span className="font-medium text-emerald">
              {formatPrice(remainingForFreeShipping)}
            </span>{" "}
            more for free shipping
          </p>
          <div className="w-full h-1 bg-stone-light">
            <div
              className="h-full bg-emerald transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="bg-emerald/10 px-6 py-4 mb-10 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald" strokeWidth={1.5} />
          <p className="text-sm text-emerald font-medium">
            You've unlocked free shipping
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 pb-4 border-b border-stone-light cursor-pointer">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-emerald"
            />
            <span className="text-xs font-medium text-ink uppercase tracking-wide">
              Select all ({cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""})
            </span>
          </label>

          <div className="divide-y divide-stone-light">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-5 py-6"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.product.id)}
                  onChange={() => toggleSelected(item.product.id)}
                  className="w-4 h-4 accent-emerald shrink-0"
                />

                <Link to={`/products/${item.product.id}`} className="shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="font-display text-lg text-ink hover:text-emerald transition truncate">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-stone uppercase tracking-wide mt-1">
                    {item.product.category}
                  </p>
                  <p className="text-sm text-stone mt-2">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>

                <div className="flex items-center border border-stone-light shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="p-2 text-ink hover:bg-stone-light transition"
                  >
                    <Minus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <span className="px-4 text-sm font-medium text-ink">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    className="p-2 text-ink hover:bg-stone-light transition"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                <p className="font-medium text-ink w-20 text-right shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </p>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-stone hover:text-ink p-2 transition shrink-0"
                >
                  <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-28 border border-stone-light p-8 space-y-5">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <div className="flex justify-between text-sm text-stone">
            <span>
              Subtotal ({selectedItems.reduce((n, i) => n + i.quantity, 0)}{" "}
              items selected)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-stone">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between font-medium text-ink border-t border-stone-light pt-5">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className="w-full text-center bg-ink text-white py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark disabled:bg-stone-light disabled:text-stone disabled:cursor-not-allowed transition"
          >
            {selectedItems.length === 0
              ? "Select items to checkout"
              : "Proceed to Checkout"}
          </button>
          <p className="flex items-center justify-center gap-2 text-xs text-stone pt-2">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
            Secure checkout
          </p>
        </div>
      </div>
    </div>
  );
}
