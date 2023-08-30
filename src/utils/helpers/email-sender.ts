import nodemailer from "nodemailer";

import env from "@/config/env";

export function sendEmail() {
  if (!env.MY_EMAIL_SERVICE) {
    return;
  }
  // console.log(env.MY_EMAIL, env.MY_EMAIL_PASS);
  const smtpTransport = nodemailer.createTransport({
    host: env.MY_EMAIL_SERVICE,
    port: +env.MY_EMAIL_PORT,
    secure: false,
    auth: {
      user: env.MY_EMAIL,
      pass: env.MY_EMAIL_PASS,
    },
  });

  return smtpTransport;
}
