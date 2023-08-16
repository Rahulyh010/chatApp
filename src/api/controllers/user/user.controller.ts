import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import { User } from "../../../database/models/user.model";
import { generateTokens } from "../../../utils/helpers/generate-tokens";
import { type TUserValidator } from "../../validator/user";
import { type TUserSignInValidator } from "../../validator/user/user.validator";

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

export async function userSignIn(req: Request, res: Response) {
  try {
    const { password, phoneNo, email } =
      req.body as TUserSignInValidator["body"];

    let userConfirmed = false;

    if (phoneNo) {
      const user = await User.findOne({ phoneNo });

      if (!user) {
        return res.status(404).json({
          reason: "there doesn't exist any user with this number",
        });
      }

      if (!user.password) {
        return res.status(400).json({
          reason: "password is undefined",
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            reason: "wrong password",
          });
        } else {
          console.log("good to go", result);
          userConfirmed = true;
        }
      });

      const tokens = generateTokens(phoneNo);
      if (!tokens) {
        return res.status(400).json({
          reason: "tokens not genrated due to internal errors",
        });
      }

      if (userConfirmed) {
        return res.status(200).json({
          data: tokens,
          message: "sucessfully logged in",
        });
      }
    }
    // email

    if (email) {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          reason: "there doesn't exist any user with this number",
        });
      }

      if (!user.password) {
        return res.status(400).json({
          reason: "password is undefined",
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            reason: "wrong password",
          });
        } else {
          console.log("good to go", result);
          userConfirmed = true;
        }
      });

      const tokens = generateTokens(email);
      if (!tokens) {
        return res.status(400).json({
          reason: "tokens not genrated due to internal errors",
        });
      }

      if (userConfirmed) {
        return res.status(200).json({
          data: tokens,
          message: "sucessfully logged in",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      reason: "internal error",
      error,
    });
  }
}
