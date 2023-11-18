import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { amount, address, phone, name, note, userId, products } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        amount: amount,
        address: address,
        phone: phone,
        name: name,
        note: note,

        completed: false,
        buyer: {
          connect: { id: userId },
        },
        products: {
          create: products,
        },
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
  }
});

//get orders by user id
router.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        buyerId: id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
});

//get order by order id
router.get("/order/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
});

//update the order status
router.put("/order/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
});

export default router;
