import { NextFunction, Request, Response } from "express";

const httpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = httpLoggerMiddleware;
