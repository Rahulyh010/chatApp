import { Router } from "express";

import validate from "../../../utils/helpers/validate-body";
import { userSignIn, userSignup } from "../../controllers/user";
import { userSignInValidtor, userValidtor } from "../../validator/user";

const router = Router();

router.post("/signup", validate(userValidtor), userSignup);
router.post("/signin", validate(userSignInValidtor), userSignIn);

export default router;
