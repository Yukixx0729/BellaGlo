import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

//create a cart
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      const newItem = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
          product: { set: productId },
        },
      });

      res.status(201).json(newItem);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

//get cart data
router.get("/:cartId", async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const cartData = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });
    res.status(200).json(cartData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

//update cart data
router.put("/:cartId", async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.body;
    const exisitingCart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });
    if (exisitingCart) {
      const updatedCart = await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          product: [...exisitingCart.product, productId],
        },
      });
      res.status(201).json(updatedCart);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

export default router;
