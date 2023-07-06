
import { Request, Response } from "express";
import { userInfoValidation, userPasswordValidation } from "../database/validation/user.validation";
import { updateUserPasswordWithUserId, updateUserWithUserId } from "../queries/user.queries";
import { ValidationError } from "joi";


export const updateUser =async(req: Request, res: Response) => {

    try {

        await userInfoValidation.validateAsync(req.body, { abortEarly: false });
        const user = await updateUserWithUserId (req.user._id,req.body);
        res.status(200).json( user?.set("password",null)) ;
    
      } catch (e) {
      
        const errors = [];
        if (e instanceof ValidationError) {
          e.details.map((error) => {
            errors.push({ field: error.path[0], message: error.message });
          });
        }else {
          errors.push({ field: "error", message:  "Error"})
      }
    
        res.status(404).send({  errors });
      }
}




export const updatePassword =async(req: Request, res: Response) => {

    try {
      
        await userPasswordValidation.validateAsync(req.body, { abortEarly: false });
        
        const user = await updateUserPasswordWithUserId (req.user._id,req.body.password);
  
        res.status(200).json( user?.set("password",null)) ;
    
      } catch (e) {
        
        const errors = [];
        if (e instanceof ValidationError) {
          e.details.map((error) => {
            errors.push({ field: error.path[0], message: error.message });
          });
        }else {
          errors.push({ field: "error", message:  "Error" })
      }
    
        res.status(404).send({  errors });
      }
}
