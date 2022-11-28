exports.requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send({ message: "Your are not logged in" });
  }
};

exports.notRequireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send({ message: "Your are  logged in" });
  }
};

