import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  const priceId = data.priceId;
  const uuid = crypto.randomUUID();

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.TEST_URL}/checkout/success`,
        cancel_url: `${process.env.TEST_URL}`,
        metadata: {
          priceId,
          uuid,
        },
      });

    const sql = neon(process.env.DATABASE_URL!);
    await sql(`INSERT INTO users (uuid, paid) VALUES ($1, $2)`, [uuid, false]);

    cookies().set({
      name: "uuid",
      value: uuid,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 365 days
      path: "/",
    });

    return Response.json({ result: checkoutSession }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
