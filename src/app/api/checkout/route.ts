import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const data = await req.json();
  const priceId = data.priceId;
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
      success_url: `${process.env.DEV_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.DEV_BASE_URL}`,
      metadata: {
        priceId,
      },
    });

  return Response.json({ result: checkoutSession }, { status: 200 });
}
