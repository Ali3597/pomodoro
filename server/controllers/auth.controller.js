const { findUserPerEmail, createUser } = require("../queries/user.queries");
const {
  userSignupValidation,
} = require("../database/validation/user.validation");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserPerEmail(email);

    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        req.login(user);
        res.json(user);
      } else {
        res.status(404).json( "Mauvais identifiants" );
      }
    } else {
    res.status(404).json( "Mauvais identifiants" );
    }
  } catch (e) {
    res.status(404).json( "error" );
  }
};

exports.me = async (req, res) => {
  try {
    if (req.user) {
      let user = { ...req.user._doc };
      delete user.local.password;
      res.json(user);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(404).json( "error" );
  }
};

exports.signout = async (req, res, next) => {
  try {
    req.logout();
    res.status(204).send();
  } catch (error) {
    res.status(404).json( "error" );
  }
};


exports.signup = async (req, res, next) => {
    try {
    await userSignupValidation.validateAsync(req.body, { abortEarly: false });
    const body = req.body;
    const user = await createUser(body);
    res.json(null);
  } catch (e) {
    const errorsMessage = [];
    if (e.isJoi) {
      e.details.map((error) => {
        errorsMessage.push({ field: error.path[0], message: error.message });
      });
    }
    res.status(400).send({ errors: errorsMessage });
  }
};