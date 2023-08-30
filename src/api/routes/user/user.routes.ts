import { Router } from "express";

import {
  otpVerification,
  userSignup,
} from "@/api/controllers/user/user.controller";
import { userValidtor } from "@/api/validator/user";
import validate from "@/utils/helpers/validate-body";

const router = Router();

router.post("/signup", validate(userValidtor), userSignup);
router.post("/verifyotp", otpVerification);

export default router;
