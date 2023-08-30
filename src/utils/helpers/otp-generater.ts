import crypto from "crypto";

export function generateOTP(digits: number) {
  const otpBuffer = crypto.randomBytes(Math.ceil(digits / 2)); // Generate random bytes
  const otp = otpBuffer.toString("hex").slice(0, digits); // Convert bytes to hexadecimal and trim to desired length
  return otp;
}
