import crypto from "crypto";

const sk = process.env.BARAY_SK!;
const iv = process.env.BARAY_IV!;
const apiKey = process.env.BARAY_API_KEY!;

export function encryptPayload(payload: Record<string, unknown>): string {
  const key = Buffer.from(sk, "base64");
  const ivBuf = Buffer.from(iv, "base64");
  const plaintext = JSON.stringify(payload);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, ivBuf);
  let encrypted = cipher.update(plaintext, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString("base64");
}

export function decryptOrderId(encryptedOrderId: string): string {
  const key = Buffer.from(sk, "base64");
  const ivBuf = Buffer.from(iv, "base64");
  const encryptedData = Buffer.from(encryptedOrderId, "base64");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuf);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf8");
}

interface PaymentIntentResponse {
  _id: string;
  org_id: string;
  order_id: string;
  amount: string;
  currency: string;
  tracking: Record<string, unknown>;
  created_at: string;
}

export async function createPaymentIntent(
  amount: string,
  currency: "USD" | "KHR",
  orderId: string,
  items: { name: string; price: number }[],
  successUrl: string
): Promise<PaymentIntentResponse> {
  const payload = {
    amount,
    currency,
    order_id: orderId,
    order_details: { items },
    custom_success_url: successUrl,
  };

  const encrypted = encryptPayload(payload);

  const res = await fetch("https://api.baray.io/pay", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: encrypted }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Baray API error (${res.status}): ${err}`);
  }

  return res.json();
}
