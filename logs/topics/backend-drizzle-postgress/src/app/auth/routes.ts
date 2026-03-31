import express from 'express'
import AuthenticationController from './controller.js';

export const authRouter = express.Router();

const authenticationController = new AuthenticationController();

authRouter.post('/signup', authenticationController.handleSignup.bind(authenticationController));