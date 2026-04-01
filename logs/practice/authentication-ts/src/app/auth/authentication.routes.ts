import express from "express";
import AuthenticationController from "./authentication.controller.js";

const authController = new AuthenticationController();
export const authRouter = express.Router();

authRouter.post("/signup", authController.handleSignup.bind(authController));
