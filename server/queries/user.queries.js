const User = require("../database/models/user.model");

exports.findUserPerEmail = (email) => {
  return User.findOne({ "local.email": email }).exec();
};

exports.findUserPerId = (id) => {
  return User.findById(id).exec();
};

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    // to create number
    const newUser = new User({
      name: user.name,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    const toreturn = await newUser.save();
    let userObject = toreturn.toObject();
    delete userObject.local.password;
    return userObject;
  } catch (e) {
    throw e;
  }
};