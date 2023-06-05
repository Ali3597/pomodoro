import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import { getOneTaskById } from "../queries/task.queries";

export const areyouTheTaskOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.taskId
        const task = await getOneTaskById(new mongoose.Types.ObjectId(taskId.trim()))
        if (task) {
            if (req.user._id.equals(task.author._id)) {
                next()
            } else {
                res.status(404).send({ message: "Your are not allowed" });
            }
        } else {

            res.status(404).send({ message: "Erreurs" });
        }

    } catch (error) {
        
        res.status(404).send({ message: error });
    }
};
