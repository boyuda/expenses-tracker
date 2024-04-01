import { Schema, model, connect } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
}

// Creating a Model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Creating a model
const User = model<IUser>('User', userSchema);

export default User;
