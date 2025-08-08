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
    const user = (await User.create({
      email,
      name,
      password: hashedPassword,
    })) 
    const { password: _, ...userData } = user;
    const result = { token: generateToken(user._id), user: userData };
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = (await User.findOne({ email }).lean()) as UserInterface | null;
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const { password: _password, ...userData } = user;
    const result = { token: generateToken(user._id), userData };
    console.log(result);
    
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
