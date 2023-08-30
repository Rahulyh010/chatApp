import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import env from "@/config/env";
import { Otp } from "@/database/models/otp";
import { User } from "@/database/models/user.model";
import { sendEmail } from "@/utils/helpers/email-sender";
import { generateTokens } from "@/utils/helpers/generate-tokens";
import { generateOTP } from "@/utils/helpers/otp-generater";
import responseHelper from "@/utils/helpers/response-helper";

export async function userSignup(req: Request, res: Response) {
  try {
    const { email } = req.body;
    console.log(email);
    const secureOTP: string = generateOTP(6);

    const otp: string = secureOTP;

    const saltRounds = 10; // Number of salt rounds to use
    const hashedPassword = await bcrypt.hash(otp, saltRounds);
    const newOtp = new Otp({ otp: hashedPassword, email });

    const mailOptions = {
      to: email,
      from: env.MY_EMAIL,
      subject: "Account Verification",
      html: `<div style="text-align: center">
      <img
        src="https://img.freepik.com/premium-vector/cute-monsters-group-set-funny-cute-monsters-aliens-fantasy-animals-gretting-card-shirts-hand-drawn-line-art-cartoon-vector-illustration_40453-2443.jpg?w=900"
        alt=""
      />
      <h1>Hello!!!!</h1>
      <p>Welcome to hi👋 app,secure fast & Indian app❣</p>
      <h2>Your Verification code </h2>
      <h1>${otp}</h1>
    </div>`,
    };
    const smtp = sendEmail();
    await smtp?.sendMail(mailOptions);
    await newOtp.save();
    return res.status(200).json(
      responseHelper({
        req,
        code: "00009",
      })
    );
  } catch (error) {
    return res.status(500).json(
      responseHelper({
        req,
        code: "00008",
        err: error,
      })
    );
  }
}

export async function otpVerification(req: Request, res: Response) {
  try {
    const { otp, email } = req.body;
    const update = await Otp.findOneAndUpdate(
      { email },
      { $inc: { attempts: 1 } },
      {
        new: true,
      }
    );
    if (!update) {
      return res.status(404).json(
        responseHelper({
          req,
          code: "10002",
        })
      );
    }
    if (+update?.attempts > 5) {
      return res.status(400).json(
        responseHelper({
          req,
          code: "10003",
        })
      );
    }
    // const data = await Otp.findOne({ email });
    if (!update?.otp) {
      return res.status(500).json(
        responseHelper({
          req,
          code: "00008",
        })
      );
    }
    const camparePassword = await bcrypt.compare(otp, update?.otp);
    // const hashedPassword = await bcrypt.hash(otp, );
    if (camparePassword) {
      await Otp.deleteOne({ email });

      return res.status(200).json(
        responseHelper({
          req,
          code: "10000",
        })
      );
    } else {
      return res.status(503).json(
        responseHelper({
          req,
          code: "10000",
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      responseHelper({
        req,
        code: "00008",
        err: error,
      })
    );
  }
}

export async function accountSetup(req: Request, res: Response) {
  try {
    const { username, bio, email, phone, device } = req.body;
    const data = new User({ username, bio, email, phone, device });
    await data.save();
    const tokens = generateTokens({
      _id: data._id.toString(),
      email,
      phone,
      username,
    });
    if (data) {
      return res.status(200).json(
        responseHelper({
          req,
          code: "10000",
          data: { data, tokens },
        })
      );
    }
    return res.status(400).json(
      responseHelper({
        req,
        code: "10004",
      })
    );
  } catch (error) {
    return res.status(500).json(
      responseHelper({
        req,
        code: "00008",
        err: error,
      })
    );
  }
}
