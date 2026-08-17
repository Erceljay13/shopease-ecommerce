import { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown, Clock } from "lucide-react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Most orders ship within 24 hours and arrive within 2-5 business days, depending on your location. Orders over $75 qualify for free shipping.",
  },
  {
    q: "What is your return policy?",
    a: "We offer 30-day easy returns on all unused items in original packaging. Simply contact us to start a return, and we'll send you a prepaid shipping label.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the country only. We're working on expanding to international shipping soon.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a confirmation email with a tracking number and link to follow your package's journey.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery, GCash, and major credit/debit cards at checkout.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-stone-light py-2.5 text-sm text-ink placeholder:text-stone focus:outline-none focus:border-ink transition";

  return (
    <div>
      <section className="relative h-72 overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              Get in Touch
            </span>
          </div>
          <h1 className="font-display text-5xl text-white leading-tight mb-3">
            Contact Us
          </h1>
          <p className="text-white/70 text-sm max-w-md">
            Have a question about an order, a product, or anything else? We'd
            love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div
            className="group bg-white border border-stone-light rounded-xl p-8 hover:border-emerald transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-card-in"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald text-white mb-5 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-brass uppercase tracking-wide mb-2">
              Email us
            </p>
            <p className="text-ink font-display text-lg mb-1">
              hello@shopease.com
            </p>
            <p className="text-stone text-xs">
              We reply within 1-2 business days
            </p>
          </div>

          <div
            className="group bg-white border border-stone-light rounded-xl p-8 hover:border-emerald transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-card-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald text-white mb-5 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-brass uppercase tracking-wide mb-2">
              Call us
            </p>
            <p className="text-ink font-display text-lg mb-1">
              +1 (555) 012-3456
            </p>
            <p className="text-stone text-xs">Mon-Fri, 9am to 6pm</p>
          </div>

          <div
            className="group bg-white border border-stone-light rounded-xl p-8 hover:border-emerald transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-card-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald text-white mb-5 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-brass uppercase tracking-wide mb-2">
              Visit us
            </p>
            <p className="text-ink font-display text-lg mb-1">
              123 Market Street
            </p>
            <p className="text-stone text-xs">Suite 400</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-16 mb-24">
          <div className="md:col-span-3 animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-brass" />
              <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
                Send a Message
              </span>
            </div>
            <h2 className="font-display text-3xl text-ink mb-8">Let's talk</h2>

            {submitted ? (
              <div className="border border-emerald bg-emerald/5 p-10 text-center">
                <h3 className="font-display text-2xl text-ink mb-3">
                  Message sent
                </h3>
                <p className="text-stone">
                  Thanks for reaching out — we'll get back to you within 1-2
                  business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={inputClass}
                />
                <textarea
                  required
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div
            className="md:col-span-2 animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-brass" />
              <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
                Hours
              </span>
            </div>
            <h2 className="font-display text-3xl text-ink mb-8">
              When we're here
            </h2>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between py-3 border-b border-stone-light">
                <span className="text-sm text-stone">Monday - Friday</span>
                <span className="text-sm text-ink font-medium">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-stone-light">
                <span className="text-sm text-stone">Saturday</span>
                <span className="text-sm text-ink font-medium">
                  10:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-stone-light">
                <span className="text-sm text-stone">Sunday</span>
                <span className="text-sm text-ink font-medium">Closed</span>
              </div>
            </div>

            <div className="bg-stone-light/40 p-6 flex items-start gap-3">
              <Clock
                className="w-4 h-4 text-emerald shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <p className="text-sm text-stone leading-relaxed">
                We typically respond to messages within 1-2 business days. For
                urgent order issues, calling is fastest.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-light pt-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              FAQ
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink mb-10">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-stone-light max-w-3xl">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="animate-card-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span
                    className={`font-display text-lg transition-colors ${openFaq === i ? "text-emerald" : "text-ink group-hover:text-emerald"}`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 flex items-center justify-center border shrink-0 ml-4 transition-all duration-300 ${openFaq === i ? "border-emerald bg-emerald/5 rotate-180" : "border-stone-light"}`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 ${openFaq === i ? "text-emerald" : "text-stone"}`}
                      strokeWidth={1.5}
                    />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: openFaq === i ? "200px" : "0px" }}
                >
                  <p className="text-stone text-sm leading-relaxed pb-6 max-w-xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
