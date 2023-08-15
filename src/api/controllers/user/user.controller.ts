import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import { User } from "../../../database/models/user.model";
import { generateTokens } from "../../../utils/helpers/generate-tokens";
import { type TUserValidator } from "../../validator/user";

export async function userSignup(req: Request, res: Response) {
  try {
    const { password, email, phoneNo } = req.body as TUserValidator["body"];

    console.log(password, email, phoneNo);
    const hashedPassword = await bcrypt.hash(password, 5);

    if (phoneNo) {
      const obj = {
        phoneNo,
        password: hashedPassword,
      };

      const data = new User(obj);
      await data.save();

      const token = generateTokens(phoneNo);

      if (!token) {
        return res.status(400).json({
          err: "token not generated",
        });
      }

      return res.status(200).json({
        data: token,
        message: "Succesfully signed up",
      });
    }

    if (email) {
      const obj = {
        email,
        password: hashedPassword,
      };

      const data = new User(obj);
      await data.save();

      const token = generateTokens(email);
      return res.status(200).json({
        data: token,
        message: "Succesfully signed up",
      });
    }
  } catch (error) {
    return res.status(500).json({
      reason: "internal error",
      error,
    });
  }
}
