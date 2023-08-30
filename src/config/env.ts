import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT as string,
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string,
  SMS_ACCOUNT_SID: process.env.ACCOUNT_SID,
  SMS_AUTH_TOKEN: process.env.AUTH_TOKEN,
  SMS_VERIFY_SID: process.env.VERIFY_SID,
  SMS_PHONE_NO: process.env.PHONE_NO,
  MY_EMAIL_SERVICE: process.env.MY_EMAIL_SERVICE as string,
  MY_EMAIL: process.env.MY_EMAIL as string,
  MY_EMAIL_PASS: process.env.MY_EMAIL_PASS as string,
  MY_EMAIL_PORT: process.env.MY_EMAIL_PORT as string,
};
