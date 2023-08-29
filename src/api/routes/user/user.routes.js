"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_body_1 = __importDefault(
  require("../../../utils/helpers/validate-body")
);
const user_1 = require("../../controllers/user");
const user_2 = require("../../validator/user");
const router = (0, express_1.Router)();
router.post(
  "/signup",
  (0, validate_body_1.default)(user_2.userValidtor),
  user_1.userSignup
);
router.post(
  "/signin",
  (0, validate_body_1.default)(user_2.userSignInValidtor),
  user_1.userSignIn
);
exports.default = router;
