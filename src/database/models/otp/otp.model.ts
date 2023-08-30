import { type InferSchemaType, model, Schema } from "mongoose";

const otpSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
type TOtpSchema = InferSchemaType<typeof otpSchema>;

export default model<TOtpSchema>("Otp", otpSchema);
