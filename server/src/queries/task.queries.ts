import { Task } from "../database/models/task.model";
import { Types } from 'mongoose';
import { User } from "../database/models/user.model";
import { TaskForm } from "../interfaces";

export const findLimitedTasksNotDoneByUserId = async (userId: Types.ObjectId, order: 1 | -1 = -1) => {
    return await Task.find({
        author: userId,
    })
        .populate({ path: "user", model: User })
        .sort({ created_at: order })
        .exec()
};

export const createNewTask = async (userId:Types.ObjectId,title:String,details:String) => {
    const newTask = new Task({
      title:title,
      details:details,
      updated_at:null,
      author:userId,
      done_at:null

    });
    return await newTask.save();
  };

  export const getOneTask= async (taskId: Types.ObjectId) => {

    return await Task.findOne({ _id: taskId })
    .populate({ path: "user", model: User })
  
  };

 


  export const toggleOneTask= async (taskId: Types.ObjectId,value :null|Date) => {

    return await Task.findByIdAndUpdate(taskId, {
      $set: {
        done_at:value
      },
    },
      { new: true })
  
  };
  
  export const updateTaskWithTaskId = async (taskId: Types.ObjectId, task:TaskForm) => {
    return await Task.findByIdAndUpdate(taskId, {
      title: task.title, 
      details : task.details
    },
      { new: true })
    .populate({ path: "user", model: User })

  };

  

  export const deleteTaskWithTaskId = async (taskId: Types.ObjectId) => {
    await Task.findOneAndDelete(taskId).exec();
  }
  