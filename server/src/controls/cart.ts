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
    res.status(500).json({ error: "An error occurred while adding to cart." });
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
    res.status(500).json({ error: "An error occurred while adding to cart." });
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
      .json({ error: "An error occurred while updating the cart." });
  }
});

//update the whole cart
router.put("/update/:cartId", async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.body;
    const exisitingCart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });
    console.log(exisitingCart);
    if (exisitingCart) {
      const index = exisitingCart.product.findIndex(
        (product: any) => product === productId
      );
      console.log(index);
      if (index !== -1) {
        console.log(exisitingCart.product);
        exisitingCart.product.splice(index, 1);
        const updatedCart = await prisma.cart.update({
          where: {
            id: cartId,
          },
          data: {
            product: exisitingCart.product,
          },
        });
        res.status(201).json(updatedCart);
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the cart." });
  }
});

//delete a cart
router.delete("/:cartId", async (req: Request, res: Response) => {
  const { cartId } = req.params;
  try {
    const deletedCart = await prisma.cart.delete({
      where: { id: cartId },
    });
    res.status(200).json({ message: "Deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the cart." });
  }
});
export default router;
