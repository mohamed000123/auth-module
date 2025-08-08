import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema<UserInterface>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true },
});

export default mongoose.model<UserInterface>("User", userSchema);
