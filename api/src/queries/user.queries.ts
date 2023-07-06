
import {User} from "../database/models/user.model";
import {UserForm,UserInfo } from "../interfaces";
import { Types } from 'mongoose';

export const findUserPerEmail = (email:string) => {
  return User.findOne({ "email": email }).exec();
};

export const findUserPerId = (id:string) => {
  return User.findById(id).exec();
};

export const createUser= async (user :UserForm) => {
  try {
    const hashedPassword =  await User.hashPassword(user.password);
    const newUser  = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    return await newUser.save();
  } catch (e) {
    throw e;
  }
};


export const updateUserWithUserId = async (userId: Types.ObjectId, userInfo: UserInfo) => {
  return await User.findByIdAndUpdate(userId, {
    email:userInfo.email,
    name:userInfo.name
  },
    { new: true })
 

};

export const updateUserPasswordWithUserId = async (userId: Types.ObjectId, userPassword: string) => {
  const hashedPassword =  await User.hashPassword(userPassword);
  return await User.findByIdAndUpdate(userId, {
    password:hashedPassword
  },
    { new: true })
 

};

