const {Router} = require("express");
const {createUser, createUserValidator} = require("../controllers/user-controller");

const userRouter = Router();

userRouter.post("/register", createUserValidator, createUser);

module.exports = userRouter;