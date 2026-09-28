import type { APIRoute } from "astro";
import { decryptOrderId } from "@/lib/baray";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { encrypted_order_id, bank } = (await request.json()) as {
      encrypted_order_id?: string;
      bank?: string;
    };

    if (!encrypted_order_id) {
      return Response.json({ error: "Missing encrypted_order_id" }, { status: 400 });
    }

    const orderId = decryptOrderId(encrypted_order_id);
    console.log(`[Baray Webhook] Order confirmed: ${orderId} via ${bank}`);

    // TODO: Update order status in your database here
    // e.g., await db.orders.update({ orderId, status: "paid", bank });

    return Response.json({ success: true, order_id: orderId });
  } catch (err) {
    console.error("[Baray Webhook] Error:", err);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }
};
