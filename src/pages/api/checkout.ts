import type { APIRoute } from "astro";
import { SITE_URL } from "astro:env/server";
import { createPaymentIntent } from "@/lib/baray";
import { products } from "@/lib/products";

export const prerender = false;

interface CheckoutItem {
  id: string;
  quantity: number;
}

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const { items } = (await request.json()) as { items?: CheckoutItem[] };

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "No items provided" }, { status: 400 });
    }

    // Prices come from the server catalog, never from the client.
    const lines = [];
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return Response.json({ error: `Invalid item: ${item.id}` }, { status: 400 });
      }
      lines.push({ product, quantity });
    }

    const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
    const amount = total.toFixed(2);
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const baseUrl = SITE_URL ?? url.origin;
    const successUrl = `${baseUrl}/order-success?order_id=${orderId}`;

    const intent = await createPaymentIntent(
      amount,
      "USD",
      orderId,
      lines.map((l) => ({
        name: `${l.product.name} x${l.quantity}`,
        price: l.product.price * l.quantity,
      })),
      successUrl
    );

    return Response.json({
      payment_url: `https://pay.baray.io/${intent._id}`,
      order_id: orderId,
      intent_id: intent._id,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Payment creation failed";
    return Response.json({ error: message }, { status: 500 });
  }
};
