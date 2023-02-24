

import { Document  } from "mongoose";




export interface  ITask extends Document {

    title: string,
    details: null| string,
    subTasks : ITask[],
    created_at: Date,
    done_at : null| Date
    
}


export interface TaskForm {
    title: string,
    details: null | string,
}



// export interface TaskModel extends Model<ITask> {

// }


