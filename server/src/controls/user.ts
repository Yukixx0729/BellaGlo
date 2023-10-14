import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { authId, email } = req.body;
  console.log(authId, email);
  const newUser = await prisma.user.create({
    data: {
      authId: authId,
      email: email,
    },
  });

  res.status(201).json(newUser);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const checkUser = await prisma.user.findUnique({
      where: { authId: id },
      include: {
        order: true,
        cart: true,
      },
    });
    if (checkUser) {
      res.json(checkUser);
    } else {
      res.status(404).json({ message: "not user found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not found" });
  }
});
export default router;
