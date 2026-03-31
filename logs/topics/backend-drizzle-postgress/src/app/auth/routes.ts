import express from 'express'
import AuthenticationController from './controller.js';
import { authenticationMiddleware, restrictToAuthenticatedUser } from './middleware/auth.middleware.js';

const authenticationController = new AuthenticationController();


export const authRouter = express.Router();


authRouter.post('/sign-up', authenticationController.handleSignup.bind(authenticationController));
authRouter.post('/sign-in', authenticationController.handleSignin.bind(authenticationController));


authRouter.get('/me', restrictToAuthenticatedUser(), authenticationController.handleMe.bind(authenticationController));