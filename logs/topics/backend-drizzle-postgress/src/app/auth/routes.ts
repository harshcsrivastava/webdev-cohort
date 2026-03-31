import express from 'express'
import AuthenticationController from './controller.js';

export const authRouter = express.Router();

const authenticationController = new AuthenticationController();

authRouter.post('/sign-up', authenticationController.handleSignup.bind(authenticationController));
authRouter.post('/sign-in', authenticationController.handleSignin.bind(authenticationController));