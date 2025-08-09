import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserInterface } from "../models/user.model";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",    
      maxAge:  24 * 60 * 60 * 1000 
    });
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ user: userData });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }) as UserInterface | null;
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user._id);
    const { password: _, ...userData } = user.toObject();
    res.cookie("token", token, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",   
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({ user: userData });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response)=>{
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
}