const secret = process.env.SECRETJWT;
const jwt = require("jsonwebtoken");
const { findUserPerId } = require("../queries/user.queries");
const { key } = require('../env/keys');
const { app } = require("../index");

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign(
    {
      sub: id || user._id.toString(),
      exp: Math.floor(Date.now() / 1000) + 5,
    },
    key
  );
  return jwtToken;
};

const decodeJwtToken = (token) => {
  return jwt.verify(token, key);
};

exports.decodeJwtToken = decodeJwtToken;

exports.createJwtToken = createJwtToken;

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && nowInSec - tokenExp < 60 * 60 * 24) {
    const refreshedToken = createJwtToken({ id: token.sub });
    res.cookie("jwt", refreshedToken);
    return jwt.verify(refreshedToken, key);
  } else {
    throw new Error("token expired");
  }
};

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      let decodedToken = jwt.verify(token, key, { ignoreExpiration: true });
      decodedToken = checkExpirationToken(decodedToken, res);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie("jwt");
        res.json(null)
      }
    } catch (e) {
      res.clearCookie("jwt");
      res.json(null)
    }
  } else {
    next();
  }
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie("jwt");
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie("jwt", token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
