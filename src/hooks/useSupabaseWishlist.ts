import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { products } from "../data/products";
import type { Product } from "../types";
import type { User } from "@supabase/supabase-js";

export function useSupabaseWishlist(user: User | null) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("user_id", user.id);

    if (!error && data) {
      const items = data
        .map((row) => products.find((p) => p.id === row.product_id))
        .filter((p): p is Product => p !== undefined);
      setWishlist(items);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const toggleWishlist = async (product: Product) => {
    if (!user) return;
    const isWishlisted = wishlist.some((p) => p.id === product.id);

    if (isWishlisted) {
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.id);
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      await supabase
        .from("wishlist_items")
        .insert({ user_id: user.id, product_id: product.id });
      setWishlist((prev) => [...prev, product]);
    }
  };

  return { wishlist, loading, toggleWishlist };
}
