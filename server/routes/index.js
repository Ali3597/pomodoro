const router = require('express').Router();
const auth = require("./auth.routes");


router.use("/api/auth", auth);
module.exports = router;