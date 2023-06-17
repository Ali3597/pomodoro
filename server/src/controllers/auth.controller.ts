import  { findUserPerEmail, createUser } from "../queries/user.queries";
import  {userSignupValidation} from "../database/validation/user.validation";
import { NextFunction, Request, Response } from "express";
import  { ValidationError } from "joi";


export const login = async (req:Request, res:Response, _:NextFunction) => {
  const errors= []
  try {
    const { email, password } = req.body;
    
    const user = await findUserPerEmail(email);

    if (user) {
      const match =  user.comparePassword(password);
      if (match) {
        req.login(user);
        res.json(user.set("password",null));
      } else {
        errors.push({ field: "password", message: "Mauvais identifiants" })
        res.status(404).send( { errors } );
      }
    } else {
      errors.push({ field: "password", message: "Mauvais identifiants" })
      res.status(404).send( { errors } );
    }
  } catch (e) {
    errors.push({ field: "error", message: "Error" })
    res.status(404).send( { errors } );
  }
};

export const me = async (req:Request, res:Response) => {
  try {
    if (req.user) {
      res.json(req.user.set("password",null));
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(404).json( "error" );
  }
};

export const signout = async (req:Request, res:Response, _:NextFunction) => {
  try {
    req.logout();
    res.status(200).send();
  } catch (error) {
    res.status(404).json( "error" );
  }
};


export const signup = async (req:Request, res:Response, _:NextFunction) => {

    try {
    await userSignupValidation.validateAsync(req.body, { abortEarly: false });
    const body = req.body;
    const user = await createUser(body);
    req.login(user);
    res.json(user.set("password",null))
    } catch (e) {
     
    const errors = [];
    if (e instanceof ValidationError) {
      e.details.map((error) => {
        errors.push({ field: error.path[0], message: error.message });
      });
    } else {
        errors.push({ field: "error", message: e })
    }
    res.status(404).send({ errors });
  }
};