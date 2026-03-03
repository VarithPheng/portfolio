import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/baray";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const amount = total.toFixed(2);
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/order-success?order_id=${orderId}`;

    const intent = await createPaymentIntent(
      amount,
      "USD",
      orderId,
      items.map((i) => ({ name: `${i.name} x${i.quantity}`, price: i.price * i.quantity })),
      successUrl
    );

    return NextResponse.json({
      payment_url: `https://pay.baray.io/${intent._id}`,
      order_id: orderId,
      intent_id: intent._id,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Payment creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
