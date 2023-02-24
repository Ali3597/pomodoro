import  mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details : {type : String},
    created_sat: {type: Date,require: true,default: Date.now()},
    done_at:{type: Date , required:false, default: null}
});

taskSchema.add({ subTasks: [taskSchema] })


export const Task = mongoose.model('Task', taskSchema);

