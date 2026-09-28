import { persistentMap } from "@nanostores/persistent";
import { computed } from "nanostores";
import { products, type Product } from "./products";

// productId -> quantity, stored as strings by persistentMap.
export const cart = persistentMap<Record<string, string>>("store-cart:");

export interface CartLine {
  product: Product;
  quantity: number;
}

export const cartLines = computed(cart, (entries): CartLine[] =>
  Object.entries(entries).flatMap(([id, qty]) => {
    const product = products.find((p) => p.id === id);
    const quantity = Number(qty);
    return product && quantity > 0 ? [{ product, quantity }] : [];
  })
);

export const cartCount = computed(cartLines, (lines) =>
  lines.reduce((sum, l) => sum + l.quantity, 0)
);

export const cartTotal = computed(cartLines, (lines) =>
  lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
);

export function setQuantity(id: string, quantity: number) {
  cart.setKey(id, quantity > 0 ? String(Math.min(quantity, 99)) : undefined);
}

export function addToCart(id: string) {
  setQuantity(id, Number(cart.get()[id] ?? 0) + 1);
}

export function clearCart() {
  for (const id of Object.keys(cart.get())) cart.setKey(id, undefined);
}

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
