

import { Document  } from "mongoose";
import { IUser } from "./user.interface";




export interface  ITask extends Document {

    title: string,
    details: null| string,
    // subTasks : ITask[],
    created_at: Date,
    updated_at:null|Date,
    done_at : null| Date
    author:IUser
    
}

export interface TaskForm {
    title: string,
    details: null | string,
}

