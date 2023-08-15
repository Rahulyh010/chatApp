import { type InferSchemaType, model, Schema } from "mongoose";

const loggedDevices = new Schema({
  deviceName: { type: String, required: true },
  loggedStatus: { type: Boolean, required: true },
});

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, default: null },
  about: { type: String, default: null },
  userName: { type: String, default: null },
  avatar: { type: Schema.Types.ObjectId, default: null },
  phoneNo: { type: Number, default: null, unique: true },
  phoneNoVerfied: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String, default: null, unique: true },
  emailVerfied: { type: Boolean, default: false },
  loggedDevices: { type: [loggedDevices], default: null },
  country: { type: String, enum: ["IN"], default: "IN" },
  settings: { type: Schema.Types.ObjectId, default: null },
  chats: { type: [Schema.Types.ObjectId], default: null },
});

type TUserSchema = InferSchemaType<typeof userSchema>;

export default model<TUserSchema>("User", userSchema);
