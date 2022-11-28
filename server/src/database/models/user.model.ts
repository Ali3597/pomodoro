const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "basic" },
  },
});

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;