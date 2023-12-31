import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const prisma = new PrismaClient();
const domain = "https://bella-glo.vercel.app/pending";

router.post("/", async (req: Request, res: Response) => {
  const { price, orderId } = req.body;

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
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/${orderId}?success=true`,
      cancel_url: `${domain}/${orderId}?canceled=true`,
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
