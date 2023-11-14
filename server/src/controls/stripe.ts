import express, { Request, Response } from "express";

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const domain = "http://localhost:5173/pending";

router.post("/", async (req: Request, res: Response) => {
  const { price, cartId } = req.body;
  const amountInCents = Math.round(price * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "Custom Product",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/${cartId}?success=true`,
      cancel_url: `${domain}/${cartId}?canceled=true`,
    });

    // console.log(session.url);
    // res.redirect(303, session.url);
    res.status(200).json(session);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

export default router;