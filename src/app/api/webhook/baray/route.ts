import { NextRequest, NextResponse } from "next/server";
import { decryptOrderId } from "@/lib/baray";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { encrypted_order_id, bank } = body as {
      encrypted_order_id: string;
      bank: string;
    };

    if (!encrypted_order_id) {
      return NextResponse.json({ error: "Missing encrypted_order_id" }, { status: 400 });
    }

    const orderId = decryptOrderId(encrypted_order_id);
    console.log(`[Baray Webhook] Order confirmed: ${orderId} via ${bank}`);

    // TODO: Update order status in your database here
    // e.g., await db.orders.update({ orderId, status: "paid", bank });

    return NextResponse.json({ success: true, order_id: orderId });
  } catch (err) {
    console.error("[Baray Webhook] Error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
