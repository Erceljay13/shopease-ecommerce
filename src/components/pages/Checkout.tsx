import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Truck, Smartphone, CreditCard } from "lucide-react";
import type { CartItem } from "../../types";
import { formatPrice } from "../../lib/formatPrice";

interface CheckoutProps {
  cartItems: CartItem[];
}

type PaymentMethod = "cod" | "gcash" | "card";

export default function Checkout({ cartItems }: CheckoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [placed, setPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const itemsToCheckout =
    (location.state as { items?: CartItem[] })?.items ?? cartItems;

  const subtotal = itemsToCheckout.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 9.99 : 0;
  const codFee = paymentMethod === "cod" ? 2.0 : 0;
  const total = subtotal + shipping + codFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-stone-light py-2 text-sm text-ink placeholder:text-stone focus:outline-none focus:border-ink transition";

  const paymentOptions: {
    value: PaymentMethod;
    label: string;
    sub: string;
    icon: typeof Truck;
  }[] = [
    {
      value: "cod",
      label: "Cash on Delivery",
      sub: "Pay when your order arrives",
      icon: Truck,
    },
    {
      value: "gcash",
      label: "GCash",
      sub: "Pay via GCash e-wallet",
      icon: Smartphone,
    },
    {
      value: "card",
      label: "Card",
      sub: "Credit or debit card",
      icon: CreditCard,
    },
  ];

  if (placed) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">
          Order Confirmed!
        </h1>
        <p className="text-stone mb-8">
          {paymentMethod === "cod"
            ? "Your order is on its way. Please have the payment ready upon delivery."
            : "Thank you for your purchase. A confirmation email is on its way."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brass" />
        <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
          Checkout
        </span>
      </div>
      <h1 className="font-display text-4xl text-ink mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="font-display text-xl text-ink mb-6">
              Shipping Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
              <input required placeholder="Full Name" className={inputClass} />
              <input
                required
                placeholder="Phone Number"
                className={inputClass}
              />
              <input
                required
                placeholder="Address"
                className={`sm:col-span-2 ${inputClass}`}
              />
              <input required placeholder="City" className={inputClass} />
              <input
                required
                placeholder="Postal Code"
                className={inputClass}
              />
              <input
                required
                placeholder="Country"
                className={`sm:col-span-2 ${inputClass}`}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink mb-6">
              Payment Method
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {paymentOptions.map((opt) => {
                const Icon = opt.icon;
                const active = paymentMethod === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPaymentMethod(opt.value)}
                    className={`text-left p-5 border transition ${active ? "border-ink bg-stone-light/40" : "border-stone-light hover:bg-stone-light/20"}`}
                  >
                    <Icon
                      className={`w-5 h-5 mb-3 ${active ? "text-emerald" : "text-stone"}`}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-medium text-ink">{opt.label}</p>
                    <p className="text-xs text-stone mt-1">{opt.sub}</p>
                  </button>
                );
              })}
            </div>

            {paymentMethod === "card" && (
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <input
                  required
                  placeholder="Card Number"
                  className={`sm:col-span-2 ${inputClass}`}
                />
                <input required placeholder="MM/YY" className={inputClass} />
                <input required placeholder="CVC" className={inputClass} />
              </div>
            )}

            {paymentMethod === "gcash" && (
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <input
                  required
                  placeholder="GCash Mobile Number"
                  className={`sm:col-span-2 ${inputClass}`}
                />
                <p className="sm:col-span-2 text-xs text-stone">
                  You'll be redirected to GCash to complete payment after
                  placing your order.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <p className="text-xs text-stone">
                A small cash handling fee of {formatPrice(2.0)} applies to Cash
                on Delivery orders.
              </p>
            )}
          </div>
        </div>

        <div className="border border-stone-light p-8 h-fit space-y-5">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          {itemsToCheckout.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm text-stone"
            >
              <span>
                {item.product.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm text-stone border-t border-stone-light pt-5">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-stone">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          {codFee > 0 && (
            <div className="flex justify-between text-sm text-stone">
              <span>COD Fee</span>
              <span>{formatPrice(codFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-ink border-t border-stone-light pt-5">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            type="submit"
            className="w-full bg-ink text-white py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
          >
            {paymentMethod === "cod"
              ? "Place Order"
              : `Pay ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
