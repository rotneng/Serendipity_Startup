const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../Controller/UserController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

module.exports = router;
