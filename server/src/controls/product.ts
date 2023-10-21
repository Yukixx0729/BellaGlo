import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { type, price, sale, description, salePrice, imgURL, name } = req.body;

  const newProduct = await prisma.product.create({
    data: {
      name: name,
      type: type,
      price: price,
      sale: sale,
      description: description,
      salePrice: salePrice,
      imgURL: imgURL,
    },
  });

  res.status(201).json(newProduct);
});

//fetch by ID
router.get("/id/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const checkProduct = await prisma.product.findUnique({
      where: { id: id },
    });
    if (checkProduct) {
      res.json(checkProduct);
    } else {
      res.status(404).json({ message: "not product found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not found" });
  }
});

//fetch by type
router.get("/type/:type", async (req: Request, res: Response) => {
  const { type } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { type: type },
    });

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: "not product found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not found" });
  }
});

//fetch if on sale
router.get("/sale", async (req: Request, res: Response) => {
  try {
    const selectedProducts = await prisma.product.findMany({
      where: { sale: true },
    });
    console.log("?");
    if (selectedProducts) {
      res.json(selectedProducts);
    } else {
      res.status(404).json({ message: "not product found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not found" });
  }
});

//get prdoucts by keywords
router.get("/series/:series", async (req: Request, res: Response) => {
  const { series } = req.params;
  const firstLetter = series.charAt(0).toUpperCase();

  const keyword = firstLetter + series.slice(1);
  try {
    const selectedProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
            },
          },
        ],
      },
    });
    if (selectedProducts) {
      res.json(selectedProducts);
    } else {
      res.status(404).json({ message: "not product found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not found" });
  }
});

//delete a product

//edit a product
export default router;
