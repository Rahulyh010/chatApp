import { Router } from "express";

import validate from "../../../utils/helpers/validate-body";
import { userSignup } from "../../controllers/user/user.controller";
import { userValidtor } from "../../validator/user";

const router = Router();

router.post("/signup", validate(userValidtor), userSignup);

export default router;
