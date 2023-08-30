import twilio from "twilio";

import env from "@/config/env";

export async function sendSMS() {
  const Twi: any = twilio;
  const client = new Twi(env.SMS_ACCOUNT_SID, env.SMS_AUTH_TOKEN);

  try {
    const message = await client.messages.create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+917204524901",
      to: "+916238564088",
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
