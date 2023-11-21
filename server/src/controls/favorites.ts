import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const list = await prisma.favourite.findUnique({
      where: {
        userId: userId,
      },
      include: {
        list: true,
      },
    });
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  try {
    if (user) {
      const newList = await prisma.favourite.create({
        data: {
          user: { connect: { id: userId } },
          list: { create: { productId: productId } },
        },
      });
      res.status(201).json(newList);
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/", async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  try {
    const existingList = await prisma.favourite.findUnique({
      where: {
        userId: userId,
      },
      include: {
        list: true,
      },
    });
    if (existingList) {
      const updatedList = await prisma.favourite.update({
        where: {
          userId: userId,
        },
        data: {
          list: {
            create: {
              productId: productId,
            },
          },
        },
      });
      res.status(200).json(updatedList);
    }
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/", async (req: Request, res: Response) => {
  const { productId, favouriteId } = req.body;
  try {
    await prisma.favProduct.deleteMany({
      where: {
        productId: productId,
        favouriteId: favouriteId,
      },
    });
    res.status(200).json({ message: "Deleted." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
