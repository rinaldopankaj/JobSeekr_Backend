import express from "express";
import { signin, signup, verifyToken } from "../controllers/userAuth.js";

const authRouter = express.Router();

// Create a User - SIGNUP/REGISTER
authRouter.post("/signup", signup);

// SIGNIN/LOGIN
authRouter.post("/signin", signin);

// VERIFYTOKEN
authRouter.post("/verifyToken", verifyToken);


export default authRouter;