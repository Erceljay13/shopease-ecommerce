import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { products } from "../data/products";
import type { CartItem } from "../types";
import type { User } from "@supabase/supabase-js";

export function useSupabaseCart(user: User | null) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("product_id, quantity")
      .eq("user_id", user.id);

    if (!error && data) {
      const items: CartItem[] = data
        .map((row) => {
          const product = products.find((p) => p.id === row.product_id);
          return product ? { product, quantity: row.quantity } : null;
        })
        .filter((item): item is CartItem => item !== null);
      setCartItems(items);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (productId: string) => {
    if (!user) return;
    const existing = cartItems.find((item) => item.product.id === productId);

    if (existing) {
      const newQty = existing.quantity + 1;
      await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .eq("user_id", user.id)
        .eq("product_id", productId);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQty } : item,
        ),
      );
    } else {
      await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: productId, quantity: 1 });
      const product = products.find((p) => p.id === productId);
      if (product) setCartItems((prev) => [...prev, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = async (productId: string, delta: number) => {
    if (!user) return;
    const existing = cartItems.find((item) => item.product.id === productId);
    if (!existing) return;
    const newQty = Math.max(1, existing.quantity + delta);

    await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const setCartItemsDirect: React.Dispatch<React.SetStateAction<CartItem[]>> = (
    value,
  ) => {
    setCartItems(value);
  };

  return {
    cartItems,
    setCartItems: setCartItemsDirect,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
