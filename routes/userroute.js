const express = require("express");
const userdata = require("../controller/usercontroller");
const router = express.Router();

router.get("/", userdata.getallUser);
router.post("/signup", userdata.signup);
router.post("/login", userdata.login);
module.exports = router;
