import { Request, Response } from "express";
import { findLimitedTasksByUserId, createNewTask, toggleOneTask, getOneTaskById, updateTaskWithTaskId, deleteTaskWithTaskId } from "../queries/task.queries";
import { taskInfoValidation } from "../database/validation/task.validation";
import { ValidationError } from "joi";
import mongoose from 'mongoose';


export const getMyTasks = async (req: Request, res: Response) => {
    try {
        let { order } = req.body;
        order = order == "ASC" ? 1 : -1
        const tasks = await findLimitedTasksByUserId(req.user._id, order)

        res.status(200).json(tasks);
    } catch (e) {
        res.status(404).send({"errors":[{ field: "error", message: "Error" }]});
    }
}

export const getOneTask = async (req: Request, res: Response) => {

    try {
        const taskId = req.params.taskId;
        const task = await getOneTaskById(new mongoose.Types.ObjectId(taskId.trim()))
        if (task) {
            res.status(200).json(task);
        } else {

            res.status(404).send({"errors":[{ field: "error", message: "Aucune tâche trouvé" }]});
        }

    } catch (e) {

        res.status(404).send({"errors":[{ field: "error", message: "Error" }]});
    }

}




export const createTask = async (req: Request, res: Response) => {

    try {
        await taskInfoValidation.validateAsync(req.body, { abortEarly: false });
        const { title, details } = req.body

        const newTask = await createNewTask(req.user._id, title, details)
        res.status(200).json(newTask);

    } catch (e) {
        const errors = [];
        if (e instanceof ValidationError) {
            e.details.map((error) => {
                errors.push({ field: error.path[0], message: error.message });
            });
        } else {
            errors.push({ field: "error", message: "Erreur" })
        }
        res.status(404).send({ errors });
    }
}

export const toggleTask = async (req: Request, res: Response) => {

    try {
        const taskId = req.params.taskId;
        const task = await getOneTaskById(new mongoose.Types.ObjectId(taskId.trim()))
        if (task) {
            const task_updated = await toggleOneTask(new mongoose.Types.ObjectId(taskId.trim()), task.done_at ? null : new Date())
            res.status(200).json(task_updated);
        } else {
            res.status(404).send({"errors":[{ field: "error", message: "Aucune tâche trouvé" }]});
        }

    } catch (e) {

        res.status(404).send({"errors":[{ field: "error", message: "Error" }]});
    }

}

export const updateTask = async (req: Request, res: Response) => {

    try {

        await taskInfoValidation.validateAsync(req.body, { abortEarly: false });
        const taskId = req.params.taskId;
        const task = await updateTaskWithTaskId(new mongoose.Types.ObjectId(taskId.trim()), req.body);
        res.status(200).json(task);

    } catch (e) {
        const errors = [];
        if (e instanceof ValidationError) {
            e.details.map((error) => {
                errors.push({ field: error.path[0], message: error.message });
            });
        } else {
            errors.push({ field: "error", message: "Error" })
        }

        res.status(404).send({ errors });
    }
}
export const deleteTask = async (req: Request, res: Response) => {

    try {
        const taskId = req.params.taskId;
        await deleteTaskWithTaskId(new mongoose.Types.ObjectId(taskId.trim()))
        res.status(200).json(null)
    } catch (e) {
        res.status(404).send({"errors":[{ field: "error", message: "Error" }]});
    }
}