import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  const priceId = data.priceId;
  const uuid = crypto.randomUUID();
  const uuidCookie = cookies().get("uuid");

  // CHECK IF USER ALREADY HAS SUBSCRIPTION
  const sql = neon(process.env.DATABASE_URL!);
  if (uuidCookie) {
    const userSearch = await sql(`SELECT * FROM users WHERE uuid = $1`, [
      uuidCookie.value,
    ]);
    const user = userSearch[0];
    if (user.paid) {
      return Response.json({ error: "Already subscribed." }, { status: 400 });
    }
  }

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
        success_url: `${process.env.TEST_URL}/login`,
        cancel_url: `${process.env.TEST_URL}/login`,
        metadata: {
          priceId,
          uuid: uuidCookie ? uuidCookie.value : uuid,
        },
      });

    return Response.json({ result: checkoutSession }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
