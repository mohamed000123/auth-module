import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    (req as any).userId = decoded.id; 

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
