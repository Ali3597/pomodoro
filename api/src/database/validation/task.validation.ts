import  Joi from "joi";


const taskInfoValidation = Joi.object({
    title: Joi.string().min(3).required().messages({
        "string.base": "Le titre n'est pas valide",
        "any.required": "Vous n' avez pas de titre ",
        "sting.min": "Votre titre est trop court",
    }),
    details: Joi.string().min(5).messages({
      "string.base": "Les details  ne sont  pas valide",
      "sting.min": "Votre  details  sont  trop court",
    }),
  });

  export  {
    taskInfoValidation,
    
  };
