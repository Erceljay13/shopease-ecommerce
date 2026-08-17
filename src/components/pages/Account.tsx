import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Package,
  Heart,
  LogOut,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type View = "login" | "register" | "profile";

export default function Account() {
  const [view, setView] = useState<View>("login");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputClass =
    "w-full bg-transparent border-b border-stone-light py-2.5 text-sm text-ink placeholder:text-stone focus:outline-none focus:border-ink transition";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) setView("profile");
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setView(session?.user ? "profile" : "login");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error) setError(error.message);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error, data } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: { data: { full_name: registerData.name } },
    });
    if (error) {
      setError(error.message);
    } else if (data.session) {
      await supabase.auth.signOut();
      setLoginData({ email: registerData.email, password: "" });
      setRegisterData({ name: "", email: "", password: "" });
      setShowSuccessModal(true);
    }
  };

  const handleContinueToSignIn = () => {
    setShowSuccessModal(false);
    setView("login");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <p className="text-stone">Loading...</p>
      </div>
    );
  }

  const successModal = showSuccessModal && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm">
      <div className="bg-white p-10 max-w-sm mx-6 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 text-emerald"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-ink mb-2">Account created</h3>
        <p className="text-stone text-sm mb-6">
          Your account has been created successfully. Sign in to get started.
        </p>
        <button
          onClick={handleContinueToSignIn}
          className="w-full bg-ink text-white py-3 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
        >
          Continue to Sign In
        </button>
      </div>
    </div>
  );

  if (view === "profile" && user) {
    const displayName =
      user.user_metadata?.full_name || user.email?.split("@")[0] || "there";
    return (
      <>
        <section className="relative h-56 overflow-hidden bg-ink">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-brass" />
              <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
                Account
              </span>
            </div>
            <h1 className="font-display text-4xl text-white leading-tight">
              Welcome back, {displayName}
            </h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brass" />
                  <h2 className="font-display text-xl text-ink">
                    Profile Information
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 bg-white border border-stone-light rounded-xl p-8">
                  <input
                    placeholder="Full Name"
                    defaultValue={user.user_metadata?.full_name || ""}
                    className={inputClass}
                  />
                  <input
                    placeholder="Email"
                    defaultValue={user.email || ""}
                    disabled
                    className={`${inputClass} opacity-60`}
                  />
                  <input placeholder="Phone Number" className={inputClass} />
                  <input placeholder="Date of Birth" className={inputClass} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brass" />
                  <h2 className="font-display text-xl text-ink">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 bg-white border border-stone-light rounded-xl p-8">
                  <input
                    placeholder="Address"
                    className={`sm:col-span-2 ${inputClass}`}
                  />
                  <input placeholder="City" className={inputClass} />
                  <input placeholder="Postal Code" className={inputClass} />
                </div>
              </div>

              <button className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition">
                Save Changes
              </button>
            </div>

            <div className="space-y-3">
              <Link
                to="/cart"
                className="group flex items-center justify-between p-5 bg-white border border-stone-light rounded-xl hover:border-emerald hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <Package
                      className="w-4 h-4 text-emerald"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-sm text-ink font-medium">
                    My Orders
                  </span>
                </div>
                <ArrowRight
                  className="w-3.5 h-3.5 text-stone group-hover:translate-x-1 group-hover:text-emerald transition-all"
                  strokeWidth={1.5}
                />
              </Link>

              <Link
                to="/wishlist"
                className="group flex items-center justify-between p-5 bg-white border border-stone-light rounded-xl hover:border-emerald hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-emerald" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-ink font-medium">Wishlist</span>
                </div>
                <ArrowRight
                  className="w-3.5 h-3.5 text-stone group-hover:translate-x-1 group-hover:text-emerald transition-all"
                  strokeWidth={1.5}
                />
              </Link>

              <div className="group flex items-center justify-between p-5 bg-white border border-stone-light rounded-xl hover:border-emerald hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <MapPin
                      className="w-4 h-4 text-emerald"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-sm text-ink font-medium">
                    Saved Addresses
                  </span>
                </div>
                <ArrowRight
                  className="w-3.5 h-3.5 text-stone group-hover:translate-x-1 group-hover:text-emerald transition-all"
                  strokeWidth={1.5}
                />
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 p-5 bg-white border border-stone-light rounded-xl hover:border-ink transition-all w-full text-left mt-6"
              >
                <div className="w-9 h-9 rounded-lg bg-stone-light flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-stone" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-stone font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        {successModal}
      </>
    );
  }
  return (
    <>
      <div className="max-w-md mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-brass" />
          <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
            Account
          </span>
        </div>
        <h1 className="font-display text-4xl text-ink mb-10">
          {view === "login" ? "Welcome back" : "Create account"}
        </h1>

        <div className="flex items-center gap-8 mb-10 border-b border-stone-light">
          <button
            onClick={() => {
              setView("login");
              setError("");
            }}
            className={`pb-4 text-sm font-medium uppercase tracking-wide transition ${view === "login" ? "text-ink border-b-2 border-ink" : "text-stone"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setView("register");
              setError("");
            }}
            className={`pb-4 text-sm font-medium uppercase tracking-wide transition ${view === "register" ? "text-ink border-b-2 border-ink" : "text-stone"}`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {view === "login" ? (
          <form onSubmit={handleLogin} className="space-y-7">
            <div className="relative">
              <Mail
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
                strokeWidth={1.5}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className={`${inputClass} pl-6`}
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
                strokeWidth={1.5}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className={`${inputClass} pl-6`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ink text-white py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-7">
            <div className="relative">
              <User
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
                strokeWidth={1.5}
              />
              <input
                required
                placeholder="Full Name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                className={`${inputClass} pl-6`}
              />
            </div>
            <div className="relative">
              <Mail
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
                strokeWidth={1.5}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className={`${inputClass} pl-6`}
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
                strokeWidth={1.5}
              />
              <input
                required
                type="password"
                placeholder="Password (min. 6 characters)"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className={`${inputClass} pl-6`}
              />
            </div>
            <p className="text-xs text-stone leading-relaxed">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
            <button
              type="submit"
              className="w-full bg-ink text-white py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
      {successModal}
    </>
  );
}
