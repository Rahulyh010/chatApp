import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../../utils/constants/env";
export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        reason: "token not sent",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        reason: "token not present",
      });
    }

    if (!JWT_SECRET_KEY) {
      return res.status(500).json({
        reason: "internal error",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}
