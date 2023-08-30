import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRY,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRY,
} from "../constants/env";

export const generateTokens = ({
  email,
  _id,
  username,
  phone,
}: {
  email: string;
  _id: string;
  username: string;
  phone: string;
}) => {
  if (!ACCESS_TOKEN_EXPIRY || !JWT_SECRET_KEY || !REFRESH_TOKEN_EXPIRY) {
    return;
  }
  const accessToken = jwt.sign(
    { _id, email, username, phone },
    JWT_SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
  const refreshToken = jwt.sign(
    { _id, email, username, phone },
    JWT_SECRET_KEY,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
  return { accessToken, refreshToken };
};
