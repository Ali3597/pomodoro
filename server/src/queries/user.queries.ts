import {User} from "../database/models/user.model";
import {UserForm } from "../interfaces";

export const findUserPerEmail = (email:string) => {
  return User.findOne({ "local.email": email }).exec();
};

export const findUserPerId = (id:string) => {
  return User.findById(id).exec();
};

export const createUser= async (user :UserForm) => {
  try {
    console.log("on est la oui oui")
    const hashedPassword =  await User.hashPassword(user.password);
    const newUser  = new User({
      name: user.name,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    return await newUser.save();
  } catch (e) {
    throw e;
  }
};