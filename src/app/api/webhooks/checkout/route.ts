import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const sql = neon(process.env.DATABASE_URL!);
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_TEST_SECRET!;
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
  const uuid = data.metadata?.uuid;

  try {
    await sql(
      `UPDATE users SET paid = $1, paid_at = $2, name_on_card = $3 WHERE uuid = $4`,
      [true, new Date(), name, uuid],
    );

    console.log(data.metadata);

    // SEND EMAIL TO USER
    // const { error } = await resend.emails.send({
    //   from: "Roket <no-reply@roket.work>",
    //   to: customerEmail ? customerEmail : "",
    //   subject: "Thank you for your purchase!",
    //   react: EmailTemplate({ name }),
    // });
    //
    // if (error) {
    //   console.error(error);
    //   return Response.json("Unable to send email", {
    //     status: 500,
    //   });
    // }

    return Response.json("Checkout complete.", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json(error, {
      status: 500,
    });
  }
}
