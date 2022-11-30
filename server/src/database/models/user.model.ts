import  mongoose from 'mongoose';
import  bcrypt from "bcrypt";
import { UserModel,IUser } from '../../interfaces';

const userSchema = new mongoose.Schema<IUser,UserModel>({
    name: { type: String, required: true, unique: true },
    local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
});

userSchema.statics.hashPassword = async (password:string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password:string) {
  return bcrypt.compareSync(password, this.local.password);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);

