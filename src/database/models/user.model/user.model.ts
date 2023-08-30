import { type InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, default: null },
  about: { type: String, default: null },
  username: { type: String, default: null },
  avatar: { type: Schema.Types.ObjectId, default: null, ref: "File" },
  email: { type: String, default: null, unique: true },
  phone: { type: String, required: true, unique: true, length: 10 },
  device: { type: String, default: null, unique: true },
  country: { type: String, enum: ["IN"], default: "IN" },
  settings: { type: Schema.Types.ObjectId, default: null, ref: "Setting" },
  chats: { type: [Schema.Types.ObjectId], default: null, ref: "Room" },
  twofactorAuthentication: { type: Boolean, default: false },
});

type TUserSchema = InferSchemaType<typeof userSchema>;

export default model<TUserSchema>("User", userSchema);
