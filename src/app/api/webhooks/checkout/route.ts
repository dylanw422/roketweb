import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

type METADATA = {
  userId: string;
  priceId: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const sql = neon(process.env.DATABASE_URL!);
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  const eventType = event.type;
  if (
    eventType !== "checkout.session.completed" &&
    eventType !== "checkout.session.async_payment_succeeded"
  ) {
    return new Response("Server Error", {
      status: 500,
    });
  }

  const data = event.data.object;
  const created = data.created;
  const customerEmail = data.customer_details?.email;
  const name = data.customer_details?.name;

  try {
    function generateProductKey() {
      const productKey = crypto.randomBytes(8).toString("hex").toUpperCase();
      return productKey.match(/.{1,4}/g)?.join("-");
    }

    const productKey = generateProductKey();

    await sql(
      "INSERT INTO product_keys (product_key, email, created_at) VALUES ($1, $2, $3)",
      [productKey, customerEmail, new Date(created)],
    );

    const { error } = await resend.emails.send({
      from: "roket@roket.app",
      to: customerEmail ? customerEmail : "",
      subject: "Thank you for your purchase! Your product key is...",
      react: EmailTemplate({ name, productKey }),
    });

    if (error) {
      console.error(error);
      return Response.json("Unable to send email", {
        status: 500,
      });
    }

    return Response.json("Product key generated", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json(error, {
      status: 500,
    });
  }
}
