

import { Document ,Model } from "mongoose";
import { ITask } from ".";



export interface  IUser extends Document {

    name: string
    email:string
    password:string
    tasks: ITask[]
    comparePassword(password:string):boolean
    
}

export interface UserForm {
    name: string,
    email:string,
    password:string
}

export interface UserInfo{
    name: string,
    email:string,

}



export interface UserjwtToken {
    user:IUser|null,
    id:string|undefined,
}


export interface UserModel extends Model<IUser> {
    hashPassword(password:string):string
  }