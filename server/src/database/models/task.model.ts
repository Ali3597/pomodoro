import  mongoose from 'mongoose';
const schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details : {type : String},
    created_at: {type: Date,require: true,default: Date.now},
    updated_at: {type: Date,require: false},
    done_at:{type: Date , required:false, default: null},
    author: { type: schema.Types.ObjectId, ref: "user", required: true },
});

// taskSchema.add({ subTasks: [taskSchema] })



export const Task = mongoose.model('Task', taskSchema);

