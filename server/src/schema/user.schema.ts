import Joi from "joi";
import { Request, Response } from "express";

export const signupSchema = (req: Request, res: Response, next: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .send(result?.error?.details?.map((detail) => detail.message));
    return;
  }
  next();
};

export const signinSchema = (req: Request, res: Response, next: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .send(result?.error?.details?.map((detail) => detail.message));
    return;
  }
  next();
};
